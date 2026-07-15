import { z } from "zod";
import * as XLSX from "xlsx";
import { isExcludedCustomer, type ParsedReport } from "./excel-parser";
import { saveLocalReport, getLocalReports } from "./local-db";

const InputSchema = z.object({
  collectionsB64: z.string().min(1),
  invoicesB64: z.string().min(1),
  reportDate: z.string().optional(), // YYYY-MM-DD override
});

function num(v: unknown): number {
  if (v === null || v === undefined || v === "") return 0;
  if (typeof v === "number") return v;
  let strVal = String(v).trim().replace(/,/g, "");
  let isNegative = false;
  if (strVal.endsWith("-")) {
    isNegative = true;
    strVal = strVal.slice(0, -1).trim();
  } else if (strVal.startsWith("-")) {
    isNegative = true;
    strVal = strVal.slice(1).trim();
  }
  const n = parseFloat(strVal);
  if (isNaN(n)) return 0;
  return isNegative ? -n : n;
}

function str(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function normalizeArabicName(name: string) {
  if (!name) return "";
  return (
    String(name)
      // eslint-disable-next-line no-misleading-character-class
      .replace(/[\u00A0\u200B\u200C\u200D\uFEFF]/g, " ")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[أإآا]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
  );
}

function toISO(d: unknown): string | null {
  if (!d) return null;
  if (d instanceof Date) return d.toISOString();
  if (typeof d === "number") {
    const parsed = XLSX.SSF.parse_date_code(d);
    if (parsed) {
      const dt = new Date(
        Date.UTC(
          parsed.y,
          parsed.m - 1,
          parsed.d,
          parsed.H || 0,
          parsed.M || 0,
          Math.floor(parsed.S || 0),
        ),
      );
      return dt.toISOString();
    }
  }
  const dt = new Date(String(d));
  return isNaN(dt.getTime()) ? null : dt.toISOString();
}

function parseWorkbook(b64: string): XLSX.WorkBook {
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return XLSX.read(bytes, { type: "array", cellDates: true });
}

function sheetRows(wb: XLSX.WorkBook, name: string): unknown[][] {
  const ws = wb.Sheets[name];
  if (!ws) return [];
  return XLSX.utils.sheet_to_json<unknown[]>(ws, {
    header: 1,
    defval: null,
    raw: true,
  });
}

function findSheet(wb: XLSX.WorkBook, keywords: string[]): string | null {
  for (const sn of wb.SheetNames) {
    const norm = sn.trim().toLowerCase();
    if (keywords.some((k) => norm.includes(k.toLowerCase()))) return sn;
  }
  return null;
}

export async function parseAndImportReport(args: { data: any }) {
  const data = InputSchema.parse(args.data);
  const wb1 = parseWorkbook(data.collectionsB64);
  const wb2 = parseWorkbook(data.invoicesB64);

  const qabdName = findSheet(wb1, ["قبض"]);
  const salesName = findSheet(wb1, ["مبيعات"]);
  const qtyName = findSheet(wb1, ["كميات"]);
  const invName = findSheet(wb1, ["فواتير"]);
  const masterDataName = findSheet(wb1, [
    "Master_Data",
    "master_data",
    "master",
    "ماستر",
  ]);

  if (!qabdName || !salesName || !qtyName || !invName) {
    throw new Error(
      "ملف التحصيل يجب أن يحتوي على شيتات: قبض، مبيعات، كميات، فواتير",
    );
  }

  const custReportName = findSheet(wb2, ["تقرير مبيعات العملاء", "العملاء"]);
  if (!custReportName) {
    throw new Error(
      "ملف فواتير اليوم يجب أن يحتوي على شيت 'تقرير مبيعات العملاء'",
    );
  }

  const salesRows = sheetRows(wb1, salesName);

  const masterNames = new Set<string>();
  const masterBalances = new Map<string, number>();
  if (masterDataName) {
    const masterRows = sheetRows(wb1, masterDataName);

    let nameIdx = 1;
    let balanceIdx = 2;
    let headerRowIdx = 0;

    // Find the header row
    for (let i = 0; i < Math.min(20, masterRows.length); i++) {
      const row = masterRows[i] || [];
      if (row.some((cell) => str(cell).includes("اسم العميل"))) {
        headerRowIdx = i;
        break;
      }
    }

    const headers = masterRows[headerRowIdx] || [];
    let nameColIdx = headers.findIndex((h) => str(h).includes("اسم العميل"));
    if (nameColIdx === -1) {
      nameColIdx = headers.findIndex((h) => {
        const s = str(h);
        return (
          (s.includes("العميل") || s.includes("اسم")) && !s.includes("كود")
        );
      });
    }
    const balColIdx = headers.findIndex((h) => {
      const s = str(h);
      return (
        s.includes("الرصيد الحالي") ||
        s.includes("الرصيد") ||
        s.includes("الحالي")
      );
    });
    if (nameColIdx !== -1) nameIdx = nameColIdx;
    if (balColIdx !== -1) balanceIdx = balColIdx;

    for (let i = headerRowIdx + 1; i < masterRows.length; i++) {
      const r = masterRows[i];
      if (!r || !Array.isArray(r)) continue;
      const cname = r.length > nameIdx ? str(r[nameIdx]) : "";
      if (cname && cname.length > 2) {
        masterNames.add(cname);
        const balVal = r.length > balanceIdx ? num(r[balanceIdx]) : 0;
        const normName = normalizeArabicName(cname);
        const existing = masterBalances.get(normName);
        if (existing === undefined || (existing === 0 && balVal !== 0)) {
          masterBalances.set(normName, balVal);
        }
      }
    }
  }

  const sabeqName = findSheet(wb1, ["سابق"]);
  const sabeqBalances = new Map<string, number>();
  if (sabeqName) {
    const sabeqRows = sheetRows(wb1, sabeqName);

    let nameIdx = 0;
    let balanceIdx = 1;
    let headerRowIdx = 0;

    for (let i = 0; i < Math.min(20, sabeqRows.length); i++) {
      const row = sabeqRows[i] || [];
      if (
        row.some((cell) => {
          const s = str(cell);
          return (
            s.includes("اسم") ||
            s.includes("العميل") ||
            s.includes("الاسم") ||
            s.includes("بيان")
          );
        })
      ) {
        headerRowIdx = i;
        break;
      }
    }

    const headers = sabeqRows[headerRowIdx] || [];
    let nameColIdx = headers.findIndex((h) => str(h).includes("اسم العميل"));
    if (nameColIdx === -1) {
      nameColIdx = headers.findIndex((h) => {
        const s = str(h);
        return (
          (s.includes("اسم") ||
            s.includes("العميل") ||
            s.includes("الاسم") ||
            s.includes("بيان")) &&
          !s.includes("كود")
        );
      });
    }
    const balColIdx = headers.findIndex((h) => {
      const s = str(h);
      return s.includes("رصيد") || s.includes("مبلغ") || s.includes("قيمة");
    });
    if (nameColIdx !== -1) nameIdx = nameColIdx;
    if (balColIdx !== -1) balanceIdx = balColIdx;

    for (let i = headerRowIdx + 1; i < sabeqRows.length; i++) {
      const r = sabeqRows[i];
      if (!r || !Array.isArray(r)) continue;
      const cname = r.length > nameIdx ? str(r[nameIdx]) : "";
      if (cname && cname.length > 2) {
        const balVal = r.length > balanceIdx ? num(r[balanceIdx]) : 0;
        const normName = normalizeArabicName(cname);
        const existing = sabeqBalances.get(normName);
        if (existing === undefined || (existing === 0 && balVal !== 0)) {
          sabeqBalances.set(normName, balVal);
        }
      }
    }
  }

  let reportDate = data.reportDate;

  if (!reportDate) {
    const headerRow = salesRows[0] || [];
    for (const cell of headerRow) {
      const iso = toISO(cell);
      if (iso) {
        reportDate = iso.slice(0, 10);
        break;
      }
    }
  }
  if (!reportDate) reportDate = new Date().toISOString().slice(0, 10);

  const totalsRow = salesRows[2] || [];
  const rawMaterialQty = num(totalsRow[1]);
  const totalQty = num(totalsRow[2]);
  const totalSalesFromSheet = num(totalsRow[3]);
  const totalCollectedFromSheet = num(totalsRow[4]);
  const feedQty = num(totalsRow[6]);

  const salesCustomersMap = new Map();
  for (let i = 4; i < salesRows.length; i++) {
    const r = salesRows[i];
    if (!r || !r[2]) continue;
    const name = str(r[2]);
    if (!name || isExcludedCustomer(name)) continue;
    const sales = num(r[3]);
    const collected = num(r[4]);
    const prev = num(r[5]);
    const bal = num(r[6]);
    const cur = salesCustomersMap.get(name) || {
      sales: 0,
      collected: 0,
      prev_balance: 0,
      balance: 0,
      invoice_count: 0,
    };
    cur.sales += sales;
    cur.collected += collected;
    cur.prev_balance = prev;
    cur.balance = bal;
    cur.invoice_count += 1;
    salesCustomersMap.set(name, cur);
  }

  const invRows = sheetRows(wb1, invName);
  const invoices: ParsedReport["invoices"] = [];
  const invoiceCountByCustomer = new Map<string, number>();
  for (let i = 1; i < invRows.length; i++) {
    const r = invRows[i];
    if (!r || !r[0]) continue;
    const cname = str(r[2]);
    if (isExcludedCustomer(cname)) continue;
    const amt = num(r[3]);
    invoices.push({
      invoice_no: str(r[0]) || null,
      invoice_date: toISO(r[1]),
      customer_name: cname || null,
      item_name: null,
      quantity: null,
      unit_price: null,
      total_amount: amt,
    });
    if (cname)
      invoiceCountByCustomer.set(
        cname,
        (invoiceCountByCustomer.get(cname) || 0) + 1,
      );
  }

  const qtyRows = sheetRows(wb1, qtyName);
  const productMap = new Map<string, { qty: number; category: string }>();
  for (let i = 1; i < qtyRows.length; i++) {
    const r = qtyRows[i];
    if (!r) continue;
    const product = str(r[1]);
    if (!product) continue;
    if (["تصنيع", "عمال", "نقل"].some((ex) => product.includes(ex))) continue;
    const issued = num(r[4]);
    const cur = productMap.get(product) || { qty: 0, category: "" };
    cur.qty += issued;
    productMap.set(product, cur);
  }

  const cust2Rows = sheetRows(wb2, custReportName);
  const customerProductsMap = new Map<
    string,
    Map<string, { qty: number; total: number }>
  >();
  const customerSalesF2 = new Map<string, { sales: number; qty: number }>();
  const productTotalsF2 = new Map<string, { qty: number; total: number }>();
  let totalSalesF2 = 0;

  for (let i = 3; i < cust2Rows.length; i++) {
    const r = cust2Rows[i];
    if (!r || !r[0]) continue;
    const cname = str(r[0]);
    if (!cname || isExcludedCustomer(cname)) continue;
    const product = str(r[2]);
    const qty = num(r[4]);
    const total = num(r[5]);
    if (!product) continue;

    const cp = customerProductsMap.get(cname) || new Map();
    const existing = cp.get(product) || { qty: 0, total: 0 };
    existing.qty += qty;
    existing.total += total;
    cp.set(product, existing);
    customerProductsMap.set(cname, cp);

    const cs = customerSalesF2.get(cname) || { sales: 0, qty: 0 };
    cs.sales += total;
    cs.qty += qty;
    customerSalesF2.set(cname, cs);

    const pt = productTotalsF2.get(product) || { qty: 0, total: 0 };
    pt.qty += qty;
    pt.total += total;
    productTotalsF2.set(product, pt);

    totalSalesF2 += total;
  }

  const qabdRows = sheetRows(wb1, qabdName);
  const collectedByCustomer = new Map<string, number>();
  let totalReceiptsFromQabd = 0;
  for (let i = 1; i < qabdRows.length; i++) {
    const r = qabdRows[i];
    if (!r) continue;
    const amt = num(r[2]);
    totalReceiptsFromQabd += amt;

    const name = str(r[0]);
    if (!name || isExcludedCustomer(name)) continue;
    const isCashClient = name.includes("نقد");

    // Only include collections if the name exists in the master customer lists (or is a cash client)
    if (!isCashClient) {
      if (masterNames.size > 0) {
        if (!masterNames.has(name)) continue;
      } else {
        if (!salesCustomersMap.has(name) && !customerSalesF2.has(name))
          continue;
      }
    }

    collectedByCustomer.set(name, (collectedByCustomer.get(name) || 0) + amt);
  }

  const allCustomerNames = new Set<string>([
    ...salesCustomersMap.keys(),
    ...collectedByCustomer.keys(),
    ...customerSalesF2.keys(),
  ]);

  const customers: ParsedReport["customers"] = [];

  for (const name of allCustomerNames) {
    if (isExcludedCustomer(name)) continue;
    const f2 = customerSalesF2.get(name);
    const fromSales = salesCustomersMap.get(name);
    const sales = Math.max(f2?.sales || 0, fromSales?.sales || 0);
    const rawCollected = Math.max(
      collectedByCustomer.get(name) || 0,
      fromSales?.collected || 0,
    );
    const collected = rawCollected;
    const qty = f2?.qty ?? 0;
    const normName = normalizeArabicName(name);
    const prevBalance =
      sabeqBalances.get(normName) ?? fromSales?.prev_balance ?? 0;

    let outstanding = masterBalances.get(normName);
    if (outstanding === undefined)
      outstanding = prevBalance + sales - collected;

    const collectionRatio = sales > 0 ? collected / sales : 0;
    const invoiceCount =
      invoiceCountByCustomer.get(name) ?? fromSales?.invoice_count ?? 0;

    let riskScore = 0;
    if (collectionRatio < 0.25) riskScore += 50;
    else if (collectionRatio < 0.5) riskScore += 25;
    if (outstanding > 50000) riskScore += 30;
    if (sales === 0 && outstanding > 0) riskScore += 20;
    riskScore = Math.min(100, Math.max(0, riskScore));

    let status = "normal";
    if (riskScore >= 70) status = "high_risk";
    else if (riskScore >= 40) status = "medium_risk";
    else if (sales === 0 && collected === 0) status = "inactive";

    customers.push({
      id: name,
      customer_name: name,
      sales_amount: sales,
      collected_amount: collected,
      prev_balance: prevBalance,
      outstanding_amount: outstanding,
      collection_ratio: collectionRatio,
      invoice_count: invoiceCount,
      total_qty: qty,
      risk_score: riskScore,
      status,
    });
  }

  const customerProducts: ParsedReport["customerProducts"] = [];
  for (const [cname, products] of customerProductsMap.entries()) {
    for (const [pname, data] of products.entries()) {
      customerProducts.push({
        customer_name: cname,
        product_name: pname,
        quantity: data.qty,
        total_amount: data.total,
      });
    }
  }

  const allProducts = new Set<string>([
    ...productMap.keys(),
    ...productTotalsF2.keys(),
  ]);
  const productAggregates: ParsedReport["productAggregates"] = [];

  for (const p of allProducts) {
    const f1 = productMap.get(p);
    const f2 = productTotalsF2.get(p);
    const qty = f2?.qty || f1?.qty || 0;
    const amt = f2?.total || 0;
    let category = "أخرى";
    if (/علف|تسمين|بادئ|نامي/.test(p)) {
      category = "علف";
    } else if (/خام|ذرة|صويا|ردة|نخالة/.test(p)) {
      category = "خامات";
    } else if (/فيتامين|املاح|بريمكس|اضافات/.test(p)) {
      category = "إضافات";
    }
    productAggregates.push({
      product_name: p,
      total_qty: qty,
      total_amount: amt,
      category,
    });
  }

  // Recalculate true ERP-level totals by using sheet-level summary totals or summing ALL customers (including excluded ones like "تصنيع" / "عمال" / "نقل")
  let sumAllSales = 0;
  let sumAllCollected = 0;
  let sumAllReceivables = 0;

  for (const name of allCustomerNames) {
    const f2 = customerSalesF2.get(name);
    const fromSales = salesCustomersMap.get(name);
    const sales = Math.max(f2?.sales || 0, fromSales?.sales || 0);
    const rawCollected = Math.max(
      collectedByCustomer.get(name) || 0,
      fromSales?.collected || 0,
    );
    sumAllSales += sales;
    sumAllCollected += rawCollected;
  }

  if (masterBalances.size > 0) {
    for (const bal of masterBalances.values()) {
      sumAllReceivables += bal;
    }
  } else {
    for (const name of allCustomerNames) {
      const f2 = customerSalesF2.get(name);
      const fromSales = salesCustomersMap.get(name);
      const sales = Math.max(f2?.sales || 0, fromSales?.sales || 0);
      const rawCollected = Math.max(
        collectedByCustomer.get(name) || 0,
        fromSales?.collected || 0,
      );
      const normName = normalizeArabicName(name);
      const prevBalance =
        sabeqBalances.get(normName) ?? fromSales?.prev_balance ?? 0;
      let outstanding = masterBalances.get(normName);
      if (outstanding === undefined)
        outstanding = prevBalance + sales - rawCollected;
      sumAllReceivables += outstanding;
    }
  }

  const totalCollectedFromTodayBuyers = customers
    .filter((c) => c.sales_amount > 0)
    .reduce((sum, c) => sum + c.collected_amount, 0);

  const totalSales = totalSalesFromSheet || sumAllSales;
  const totalCollected = totalCollectedFromTodayBuyers;
  const finalTotalQty =
    totalQty || customers.reduce((sum, c) => sum + c.total_qty, 0);

  const collectionRate =
    totalSales > 0 ? totalCollectedFromTodayBuyers / totalSales : 0;
  const customerCount = new Set(
    invoices.map((inv) => inv.customer_name).filter(Boolean),
  ).size;
  const invoiceCountTotal = invoices.length;
  const averageInvoice =
    invoiceCountTotal > 0 ? totalSales / invoiceCountTotal : 0;

  const existingReports = await getLocalReports();
  const existingSameDate = existingReports.find(
    (r: any) => r.report.report_date === reportDate,
  );

  // Compute default opening balance by looking chronologically for the closest previous report's total debt
  const sortedChronologically = [...existingReports].sort(
    (a: any, b: any) =>
      new Date(a.report.report_date).getTime() -
      new Date(b.report.report_date).getTime(),
  );

  let defaultOpeningBalance = 0;
  const currentDateTime = new Date(reportDate).getTime();
  const previousReport = sortedChronologically
    .filter(
      (r: any) => new Date(r.report.report_date).getTime() < currentDateTime,
    )
    .pop();

  if (previousReport) {
    defaultOpeningBalance =
      (previousReport.report.opening_balance || 0) +
      (previousReport.report.total_sales || 0) -
      (previousReport.report.total_collected || 0);
  }

  const finalOpeningBalance = existingSameDate
    ? existingSameDate.report.opening_balance || 0
    : defaultOpeningBalance;

  const calculatedTotalReceivables =
    finalOpeningBalance + totalSales - totalReceiptsFromQabd;

  const reportId = await saveLocalReport({
    report: {
      id: existingSameDate ? existingSameDate.report.id : undefined,
      report_date: reportDate,
      total_sales: totalSales,
      total_collected: totalCollected,
      total_receipts_qabd: totalReceiptsFromQabd,
      total_collected_from_sheet: totalCollected,
      total_sales_from_sheet: totalSalesFromSheet,
      collection_rate: collectionRate,
      total_qty: finalTotalQty,
      raw_material_qty: rawMaterialQty,
      feed_qty: feedQty,
      customer_count: customerCount,
      invoice_count: invoiceCountTotal,
      average_invoice: averageInvoice,
      total_receivables: calculatedTotalReceivables,
      opening_balance: finalOpeningBalance,
      uploaded_by: null,
      ai_summary: existingSameDate?.report.ai_summary || null,
    },
    customers,
    products: productAggregates,
    customerProducts,
    invoices,
  });

  return {
    reportId,
    reportDate,
    totalSales,
    totalCollected,
    customerCount,
    invoiceCount: invoiceCountTotal,
  };
}
