import {
  getLocalReports,
  getLocalReport,
  saveLocalReport,
  deleteLocalReport,
  resetLocalDb,
} from "./local-db";

export async function listReports() {
  const reports = await getLocalReports();
  for (const reportData of reports) {
    if (!reportData?.customers) continue;
    const dynamicSales = reportData.customers.reduce(
      (sum: number, c: any) => sum + (c.sales_amount || 0),
      0,
    );
    const dynamicCollectedTodayBuyers = reportData.customers
      .filter((c: any) => (c.sales_amount || 0) > 0)
      .reduce((sum: number, c: any) => sum + (c.collected_amount || 0), 0);
    const dynamicCollected = dynamicCollectedTodayBuyers;
    const dynamicReceivables = reportData.customers.reduce(
      (sum: number, c: any) => sum + (c.outstanding_amount || 0),
      0,
    );
    const dynamicCollectionRate =
      dynamicSales > 0 ? dynamicCollectedTodayBuyers / dynamicSales : 0;

    const hasTotals =
      typeof reportData.report.total_sales === "number" &&
      !isNaN(reportData.report.total_sales) &&
      typeof reportData.report.total_collected === "number" &&
      !isNaN(reportData.report.total_collected) &&
      typeof reportData.report.total_receivables === "number" &&
      !isNaN(reportData.report.total_receivables);

    if (!hasTotals) {
      reportData.report.total_sales = dynamicSales;
      reportData.report.total_collected = dynamicCollected;
      reportData.report.total_receivables = dynamicReceivables;
      reportData.report.collection_rate = dynamicCollectionRate;
      await saveLocalReport(reportData);
    }
    // Always compute total_receivables dynamically to reflect Opening Balance + Sales - Collected
    reportData.report.total_receivables =
      (reportData.report.opening_balance || 0) +
      (reportData.report.total_sales || 0) -
      (reportData.report.total_receipts_qabd ??
        reportData.report.total_collected ??
        0);
  }
  return reports.map((r) => r.report);
}

export async function getLatestReportFull(
  args: { data?: { reportId?: string } } = {},
) {
  const { data = {} } = args;

  const allReportsData = await getLocalReports();

  let reportData;
  if (data.reportId) {
    reportData = allReportsData.find((r) => r.report.id === data.reportId);
  } else {
    reportData = allReportsData[0];
  }

  if (!reportData) return null;

  // Auto-heal report data if parsed under older parser logic
  if (reportData.customers) {
    const dynamicSales = reportData.customers.reduce(
      (sum: number, c: any) => sum + (c.sales_amount || 0),
      0,
    );
    const dynamicCollectedTodayBuyers = reportData.customers
      .filter((c: any) => (c.sales_amount || 0) > 0)
      .reduce((sum: number, c: any) => sum + (c.collected_amount || 0), 0);
    const dynamicCollected = dynamicCollectedTodayBuyers;
    const dynamicReceivables = reportData.customers.reduce(
      (sum: number, c: any) => sum + (c.outstanding_amount || 0),
      0,
    );
    const dynamicCollectionRate =
      dynamicSales > 0 ? dynamicCollectedTodayBuyers / dynamicSales : 0;

    const hasTotals =
      typeof reportData.report.total_sales === "number" &&
      !isNaN(reportData.report.total_sales) &&
      typeof reportData.report.total_collected === "number" &&
      !isNaN(reportData.report.total_collected) &&
      typeof reportData.report.total_receivables === "number" &&
      !isNaN(reportData.report.total_receivables);

    if (!hasTotals) {
      reportData.report.total_sales = dynamicSales;
      reportData.report.total_collected = dynamicCollected;
      reportData.report.total_receivables = dynamicReceivables;
      reportData.report.collection_rate = dynamicCollectionRate;
      await saveLocalReport(reportData);
    }

    // Always compute total_receivables dynamically for the main report
    reportData.report.total_receivables =
      (reportData.report.opening_balance || 0) +
      (reportData.report.total_sales || 0) -
      (reportData.report.total_receipts_qabd ??
        reportData.report.total_collected ??
        0);
  }

  // Remove duplicates by report_date
  const uniqueReportsMap = new Map();
  for (const r of allReportsData) {
    if (!uniqueReportsMap.has(r.report.report_date)) {
      // Ensure comparisons also use dynamic total_receivables
      r.report.total_receivables =
        (r.report.opening_balance || 0) +
        (r.report.total_sales || 0) -
        (r.report.total_receipts_qabd ?? r.report.total_collected ?? 0);
      uniqueReportsMap.set(r.report.report_date, r.report);
    }
  }
  const reports35 = Array.from(uniqueReportsMap.values()).slice(0, 35);

  const reportDateStr = reportData.report.report_date;

  const findClosest = (targetDate: Date) => {
    const targetStr = targetDate.toISOString().slice(0, 10);
    const exact = reports35.find((r) => r.report_date === targetStr);
    if (exact) return exact;
    let best: (typeof reports35)[number] | null = null;
    let bestDiff = Infinity;
    for (const r of reports35) {
      if (r.report_date === reportDateStr) continue;
      const diff = Math.abs(
        new Date(r.report_date).getTime() - targetDate.getTime(),
      );
      if (diff < bestDiff && diff <= 3 * 86400000) {
        bestDiff = diff;
        best = r;
      }
    }
    return best;
  };

  const reportDate = new Date(reportData.report.report_date);
  const yesterdayDate = new Date(reportDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const lastWeekDate = new Date(reportDate);
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);
  const lastMonthDate = new Date(reportDate);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

  // Dynamic aggregation for categories from products
  const categoryMap = new Map<
    string,
    { category: string; total_qty: number; total_amount: number }
  >();
  for (const p of reportData.products || []) {
    const catName = p.category || "أخرى";
    const cur = categoryMap.get(catName) || {
      category: catName,
      total_qty: 0,
      total_amount: 0,
    };
    cur.total_qty += p.total_qty || 0;
    cur.total_amount += p.total_amount || 0;
    categoryMap.set(catName, cur);
  }
  const categoriesList = Array.from(categoryMap.values()).sort(
    (a, b) => b.total_qty - a.total_qty,
  );

  return {
    ...reportData,
    categories: categoriesList,
    comparisons: {
      yesterday: findClosest(yesterdayDate),
      lastWeek: findClosest(lastWeekDate),
      lastMonth: findClosest(lastMonthDate),
    },
    history: reports35.slice(0, 30),
  };
}

export async function deleteReport(args: { data: { reportId: string } }) {
  await deleteLocalReport(args.data.reportId);
  return { ok: true };
}

export async function updateOpeningBalance(args: {
  data: { reportId: string; openingBalance: number };
}) {
  const reportData = await getLocalReport(args.data.reportId);
  if (reportData) {
    reportData.report.opening_balance = args.data.openingBalance;
    reportData.report.total_receivables =
      args.data.openingBalance +
      (reportData.report.total_sales || 0) -
      (reportData.report.total_receipts_qabd ??
        reportData.report.total_collected ??
        0);
    await saveLocalReport(reportData);
  }
  return { ok: true };
}

export async function resetAllReports() {
  await resetLocalDb();
  return { ok: true };
}
