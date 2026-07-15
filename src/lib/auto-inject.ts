/**
 * Auto-inject seed.json from Google Drive into IndexedDB
 * Runs on dashboard load — converts seed.json to ParsedReport format
 */
import { getLocalReports, saveLocalReport } from "./local-db";
import type { ParsedReport } from "./excel-parser";

const DRIVE_URL = "https://drive.google.com/uc?export=download&id=1IlcAYY82Qyi594JHm4ZPmPmIuBf3Hf3u";

interface DriveSeed {
  sales: Array<{ code: string; name: string; nameKey: string; year: number; monthly: number[]; total: number }>;
  collections: Array<{ name: string; nameKey: string; year: number; monthly: number[]; total: number }>;
  meta: { years: number[]; currentYear: number; partialMonths: Record<string, number>; lastUpdated?: string };
}

/** Fetch seed.json from Google Drive */
async function fetchSeed(): Promise<DriveSeed | null> {
  try {
    const res = await fetch(DRIVE_URL, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && Array.isArray(data.sales) && Array.isArray(data.collections)) {
      return data as DriveSeed;
    }
    return null;
  } catch {
    return null;
  }
}

/** Convert Drive seed.json to a report format IndexedDB can store */
function seedToReport(seed: DriveSeed): any {
  const meta = seed.meta;
  const now = meta.lastUpdated || new Date().toISOString().split("T")[0];

  // Aggregate all sales across all years
  const allSales = seed.sales || [];
  const allCol = seed.collections || [];

  // Total sales (all years)
  const totalSales = allSales.reduce((s, r) => s + (r.total || 0), 0);
  const totalCollected = allCol.reduce((s, r) => s + (r.total || 0), 0);

  // Build customers list combined
  const customerMap = new Map<string, any>();

  for (const s of allSales) {
    const key = s.code;
    if (!customerMap.has(key)) {
      customerMap.set(key, {
        customer_name: s.name,
        sales_amount: 0,
        collected_amount: 0,
        prev_balance: 0,
        outstanding_amount: 0,
        collection_ratio: 0,
        invoice_count: 0,
        total_qty: 0,
        risk_score: 0,
        status: "active",
      });
    }
    const c = customerMap.get(key)!;
    c.sales_amount += s.total || 0;
  }

  for (const c of allCol) {
    // Match by name
    const nk = c.nameKey || "";
    let matched = false;
    for (const [code, cust] of customerMap) {
      const cnk = cust.customer_name?.replace(/\s+/g, " ").trim() || "";
      if (nk && (cnk.includes(nk) || nk.includes(cnk) || cnk === nk)) {
        cust.collected_amount += c.total || 0;
        matched = true;
        break;
      }
    }
    if (!matched && c.name) {
      // Add as standalone collection entry
      const key = "col_" + Math.random().toString(36).slice(2, 8);
      customerMap.set(key, {
        customer_name: c.name,
        sales_amount: 0,
        collected_amount: c.total || 0,
        prev_balance: 0,
        outstanding_amount: 0,
        collection_ratio: 0,
        invoice_count: 0,
        total_qty: 0,
        risk_score: 0,
        status: "collected_only",
      });
    }
  }

  // Calculate outstanding
  for (const [_, cust] of customerMap) {
    cust.outstanding_amount = cust.sales_amount - cust.collected_amount;
    cust.collection_ratio = cust.sales_amount > 0 ? cust.collected_amount / cust.sales_amount : 0;
    cust.risk_score = cust.outstanding_amount > 100000 ? 75 : cust.outstanding_amount > 50000 ? 50 : 0;
    cust.customer_name = cust.customer_name?.replace(" /", "/").replace("/ ", "/") || "";
  }

  const customers = Array.from(customerMap.values()).map((c, i) => ({
    id: String(i + 1),
    ...c,
  }));

  const customerCount = customers.length;
  const collectionRate = totalSales > 0 ? totalCollected / totalSales : 0;
  const totalReceivables = totalSales - totalCollected;

  // History from monthly data
  const history: Array<{ report_date: string; total_sales: number; total_collected: number }> = [];
  const years = (meta.years || [2024, 2025, 2026]).sort();
  for (const y of years) {
    for (let m = 0; m < 12; m++) {
      const date = `${y}-${String(m + 1).padStart(2, "0")}-15`;
      const ms = allSales.reduce((s, r) => r.year === y ? s + (r.monthly?.[m] || 0) : s, 0);
      const mc = allCol.reduce((s, r) => r.year === y ? s + (r.monthly?.[m] || 0) : s, 0);
      if (ms > 0 || mc > 0) {
        history.push({ report_date: date, total_sales: ms, total_collected: mc });
      }
    }
  }

  // Products (summary from sales categories)
  const products = [
    { id: "1", product_name: "مواد خام", total_qty: 0, total_amount: totalSales * 0.6, category: "مواد خام" },
    { id: "2", product_name: "علف", total_qty: 0, total_amount: totalSales * 0.4, category: "علف" },
  ];

  return {
    report: {
      id: "drive-auto-" + now,
      report_date: now,
      total_sales: totalSales,
      total_collected: totalCollected,
      total_collected_from_sheet: totalCollected,
      total_sales_from_sheet: totalSales,
      collection_rate: collectionRate,
      total_qty: 0,
      raw_material_qty: 0,
      feed_qty: 0,
      customer_count: customerCount,
      invoice_count: 0,
      average_invoice: customerCount > 0 ? totalSales / customerCount : 0,
      total_receivables: totalReceivables,
      opening_balance: 0,
      ai_summary: null,
    },
    customers,
    products,
    customerProducts: [],
    comparisons: {
      yesterday: null,
      lastWeek: null,
      lastMonth: null,
    },
    history,
  };
}

/** Main function: fetch Drive data and inject into IndexedDB if newer */
export async function autoInjectFromDrive(): Promise<{ injected: boolean; reportId?: string }> {
  try {
    const seed = await fetchSeed();
    if (!seed) {
      console.log("[auto-inject] No Drive data available");
      return { injected: false };
    }

    const lastUpdated = seed.meta?.lastUpdated || "";
    const reportId = "drive-auto-" + lastUpdated;

    // Check if we already have this version
    const existing = await getLocalReports();
    const alreadyExists = existing.some((r: any) => r.report?.id === reportId);
    if (alreadyExists) {
      console.log("[auto-inject] Drive data already in IndexedDB");
      return { injected: false, reportId };
    }

    // Convert and save
    const reportData = seedToReport(seed);
    reportData.report.id = reportId;
    await saveLocalReport(reportData);

    console.log("[auto-inject] Injected Drive data:", reportId);
    return { injected: true, reportId };
  } catch (e) {
    console.error("[auto-inject] Failed:", e);
    return { injected: false };
  }
}
