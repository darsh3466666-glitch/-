import { k as keys, g as get, s as set, d as del } from "../_libs/idb-keyval.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
async function getLocalReports() {
  const reportsKeys = await keys();
  const reports = [];
  for (const k of reportsKeys) {
    if (typeof k === "string" && k.startsWith("report_")) {
      reports.push(await get(k));
    }
  }
  reports.sort(
    (a, b) => new Date(b.report.report_date).getTime() - new Date(a.report.report_date).getTime()
  );
  return reports;
}
async function getLocalReport(id) {
  return await get(`report_${id}`);
}
async function saveLocalReport(reportData) {
  const id = reportData.report.id || crypto.randomUUID();
  reportData.report.id = id;
  await set(`report_${id}`, reportData);
  return id;
}
async function deleteLocalReport(id) {
  await del(`report_${id}`);
}
async function resetLocalDb() {
  const reportsKeys = await keys();
  for (const k of reportsKeys) {
    if (typeof k === "string" && k.startsWith("report_")) {
      await del(k);
    }
  }
}
async function saveAiSummaryLocally(reportId, summary) {
  const data = await get(`report_${reportId}`);
  if (data) {
    data.report.ai_summary = summary;
    await set(`report_${reportId}`, data);
  }
}
async function listReports() {
  const reports = await getLocalReports();
  for (const reportData of reports) {
    if (!reportData?.customers) continue;
    const dynamicSales = reportData.customers.reduce(
      (sum, c) => sum + (c.sales_amount || 0),
      0
    );
    const dynamicCollectedTodayBuyers = reportData.customers.filter((c) => (c.sales_amount || 0) > 0).reduce((sum, c) => sum + (c.collected_amount || 0), 0);
    const dynamicCollected = dynamicCollectedTodayBuyers;
    const dynamicReceivables = reportData.customers.reduce(
      (sum, c) => sum + (c.outstanding_amount || 0),
      0
    );
    const dynamicCollectionRate = dynamicSales > 0 ? dynamicCollectedTodayBuyers / dynamicSales : 0;
    const hasTotals = typeof reportData.report.total_sales === "number" && !isNaN(reportData.report.total_sales) && typeof reportData.report.total_collected === "number" && !isNaN(reportData.report.total_collected) && typeof reportData.report.total_receivables === "number" && !isNaN(reportData.report.total_receivables);
    if (!hasTotals) {
      reportData.report.total_sales = dynamicSales;
      reportData.report.total_collected = dynamicCollected;
      reportData.report.total_receivables = dynamicReceivables;
      reportData.report.collection_rate = dynamicCollectionRate;
      await saveLocalReport(reportData);
    }
    reportData.report.total_receivables = (reportData.report.opening_balance || 0) + (reportData.report.total_sales || 0) - (reportData.report.total_receipts_qabd ?? reportData.report.total_collected ?? 0);
  }
  return reports.map((r) => r.report);
}
async function getLatestReportFull(args = {}) {
  const { data = {} } = args;
  const allReportsData = await getLocalReports();
  let reportData;
  if (data.reportId) {
    reportData = allReportsData.find((r) => r.report.id === data.reportId);
  } else {
    reportData = allReportsData[0];
  }
  if (!reportData) return null;
  if (reportData.customers) {
    const dynamicSales = reportData.customers.reduce(
      (sum, c) => sum + (c.sales_amount || 0),
      0
    );
    const dynamicCollectedTodayBuyers = reportData.customers.filter((c) => (c.sales_amount || 0) > 0).reduce((sum, c) => sum + (c.collected_amount || 0), 0);
    const dynamicCollected = dynamicCollectedTodayBuyers;
    const dynamicReceivables = reportData.customers.reduce(
      (sum, c) => sum + (c.outstanding_amount || 0),
      0
    );
    const dynamicCollectionRate = dynamicSales > 0 ? dynamicCollectedTodayBuyers / dynamicSales : 0;
    const hasTotals = typeof reportData.report.total_sales === "number" && !isNaN(reportData.report.total_sales) && typeof reportData.report.total_collected === "number" && !isNaN(reportData.report.total_collected) && typeof reportData.report.total_receivables === "number" && !isNaN(reportData.report.total_receivables);
    if (!hasTotals) {
      reportData.report.total_sales = dynamicSales;
      reportData.report.total_collected = dynamicCollected;
      reportData.report.total_receivables = dynamicReceivables;
      reportData.report.collection_rate = dynamicCollectionRate;
      await saveLocalReport(reportData);
    }
    reportData.report.total_receivables = (reportData.report.opening_balance || 0) + (reportData.report.total_sales || 0) - (reportData.report.total_receipts_qabd ?? reportData.report.total_collected ?? 0);
  }
  const uniqueReportsMap = /* @__PURE__ */ new Map();
  for (const r of allReportsData) {
    if (!uniqueReportsMap.has(r.report.report_date)) {
      r.report.total_receivables = (r.report.opening_balance || 0) + (r.report.total_sales || 0) - (r.report.total_receipts_qabd ?? r.report.total_collected ?? 0);
      uniqueReportsMap.set(r.report.report_date, r.report);
    }
  }
  const reports35 = Array.from(uniqueReportsMap.values()).slice(0, 35);
  const reportDateStr = reportData.report.report_date;
  const findClosest = (targetDate) => {
    const targetStr = targetDate.toISOString().slice(0, 10);
    const exact = reports35.find((r) => r.report_date === targetStr);
    if (exact) return exact;
    let best = null;
    let bestDiff = Infinity;
    for (const r of reports35) {
      if (r.report_date === reportDateStr) continue;
      const diff = Math.abs(
        new Date(r.report_date).getTime() - targetDate.getTime()
      );
      if (diff < bestDiff && diff <= 3 * 864e5) {
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
  const categoryMap = /* @__PURE__ */ new Map();
  for (const p of reportData.products || []) {
    const catName = p.category || "أخرى";
    const cur = categoryMap.get(catName) || {
      category: catName,
      total_qty: 0,
      total_amount: 0
    };
    cur.total_qty += p.total_qty || 0;
    cur.total_amount += p.total_amount || 0;
    categoryMap.set(catName, cur);
  }
  const categoriesList = Array.from(categoryMap.values()).sort(
    (a, b) => b.total_qty - a.total_qty
  );
  return {
    ...reportData,
    categories: categoriesList,
    comparisons: {
      yesterday: findClosest(yesterdayDate),
      lastWeek: findClosest(lastWeekDate),
      lastMonth: findClosest(lastMonthDate)
    },
    history: reports35.slice(0, 30)
  };
}
async function deleteReport(args) {
  await deleteLocalReport(args.data.reportId);
  return { ok: true };
}
async function updateOpeningBalance(args) {
  const reportData = await getLocalReport(args.data.reportId);
  if (reportData) {
    reportData.report.opening_balance = args.data.openingBalance;
    reportData.report.total_receivables = args.data.openingBalance + (reportData.report.total_sales || 0) - (reportData.report.total_receipts_qabd ?? reportData.report.total_collected ?? 0);
    await saveLocalReport(reportData);
  }
  return { ok: true };
}
async function resetAllReports() {
  await resetLocalDb();
  return { ok: true };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Card = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold tracking-wide cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-11 rounded-full px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Table = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left rtl:text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function fmtMoney(n) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    n || 0
  ) + " ج.م";
}
function fmtNumber(n, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits
  }).format(n || 0);
}
function fmtPct(n) {
  return ((n || 0) * 100).toFixed(1) + "%";
}
export {
  Button as B,
  Card as C,
  Table as T,
  CardHeader as a,
  CardTitle as b,
  CardContent as c,
  TableHeader as d,
  TableRow as e,
  TableHead as f,
  TableBody as g,
  TableCell as h,
  fmtMoney as i,
  fmtPct as j,
  deleteReport as k,
  listReports as l,
  getLocalReports as m,
  fmtNumber as n,
  cn as o,
  buttonVariants as p,
  getLatestReportFull as q,
  resetAllReports as r,
  saveLocalReport as s,
  saveAiSummaryLocally as t,
  updateOpeningBalance as u
};
