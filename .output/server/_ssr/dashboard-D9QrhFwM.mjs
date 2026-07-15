import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button, C as Card, c as CardContent, m as getLocalReports, s as saveLocalReport, j as fmtPct, i as fmtMoney, n as fmtNumber, a as CardHeader, b as CardTitle, T as Table, d as TableHeader, e as TableRow, f as TableHead, g as TableBody, h as TableCell, o as cn, p as buttonVariants, r as resetAllReports, u as updateOpeningBalance, q as getLatestReportFull, t as saveAiSummaryLocally } from "./formatters-BWTcDPT3.mjs";
import { R as Root2, T as Trigger2, P as Portal2, C as Content2, a as Title2, D as Description2, b as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as utils, w as writeFileSync, r as readSync, S as SSF } from "../_libs/xlsx.mjs";
import { D as Dialog$1, a as DialogTrigger$1, b as DialogPortal$1, d as DialogContent$1, g as DialogClose, e as DialogTitle$1, f as DialogDescription$1, h as DialogOverlay$1 } from "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/firebase.mjs";
import { o as onAuthStateChanged, s as signInWithPopup, G as GoogleAuthProvider, g as getAuth } from "../_libs/firebase__auth.mjs";
import { c as getApps, i as initializeApp } from "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-SdRzJ3tI.mjs";
import { R as Route$1 } from "./router-CsPbxP-R.mjs";
import "../_libs/seroval.mjs";
import { a as TrendingUp, D as Download, H as History, S as Sun, M as Moon, P as Printer, b as TriangleAlert, c as ExternalLink, d as Monitor, e as Smartphone, T as Trash2, f as HardDrive, L as LoaderCircle, U as Upload, W as Wallet, g as Percent, C as CircleAlert, B as Boxes, h as Package, i as Users, F as FileText, R as Receipt, j as List, k as Sparkles, X, l as Search, m as FileSpreadsheet, n as ArrowUpDown, o as ArrowUp, p as ArrowDown, q as Minus } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, P as PieChart, a as Pie, C as Cell, T as Tooltip, A as AreaChart, b as CartesianGrid, X as XAxis, Y as YAxis, L as Legend, c as Area } from "../_libs/recharts.mjs";
import { o as objectType, s as stringType, a as anyType, n as numberType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/idb-keyval.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const AlertDialog = Root2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function KpiCard({
  label,
  value,
  sub,
  diff,
  diffLabel,
  tone = "default",
  icon
}) {
  const toneClass = tone === "success" ? "border-r-success" : tone === "warning" ? "border-r-warning" : tone === "danger" ? "border-r-destructive shadow-coral-glow" : tone === "info" ? "border-r-info shadow-sky-glow" : "border-r-accent shadow-accent-glow";
  const arrow = diff === void 0 ? null : diff > 0.5 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3" }) : diff < -0.5 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" });
  const diffColor = diff === void 0 ? "" : diff > 0 ? "text-success" : diff < 0 ? "text-destructive" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `border-r-[6px] border-t-0 border-b-0 border-l-0 ${toneClass} rounded-[24px] shadow-card transition-shadow hover:scale-[1.02] duration-200 cursor-pointer overflow-hidden relative bg-card`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground truncate", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-extrabold mt-1 tracking-wider text-foreground", children: value }),
            sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/80 font-medium mt-1", children: sub })
          ] }),
          icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-accent shrink-0 text-3xl opacity-80", children: icon })
        ] }),
        diff !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-1 text-xs font-bold mt-3 ${diffColor}`,
            children: [
              " ",
              arrow,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Math.abs(diff).toFixed(1),
                "%"
              ] }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70 font-medium", children: diffLabel }),
              " "
            ]
          }
        )
      ] })
    }
  );
}
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const EXCLUDED_CUSTOMERS = ["تصنيع", "عمال", "نقل"];
function isExcludedCustomer(name) {
  if (!name) return false;
  const n = String(name).trim();
  return EXCLUDED_CUSTOMERS.some((ex) => n.includes(ex));
}
const InputSchema = objectType({
  collectionsB64: stringType().min(1),
  invoicesB64: stringType().min(1),
  reportDate: stringType().optional()
  // YYYY-MM-DD override
});
function num(v) {
  if (v === null || v === void 0 || v === "") return 0;
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
function str(v) {
  if (v === null || v === void 0) return "";
  return String(v).trim();
}
function normalizeArabicName(name) {
  if (!name) return "";
  return String(name).replace(/[\u00A0\u200B\u200C\u200D\uFEFF]/g, " ").trim().replace(/\s+/g, " ").replace(/[أإآا]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");
}
function toISO(d) {
  if (!d) return null;
  if (d instanceof Date) return d.toISOString();
  if (typeof d === "number") {
    const parsed = SSF.parse_date_code(d);
    if (parsed) {
      const dt2 = new Date(
        Date.UTC(
          parsed.y,
          parsed.m - 1,
          parsed.d,
          parsed.H || 0,
          parsed.M || 0,
          Math.floor(parsed.S || 0)
        )
      );
      return dt2.toISOString();
    }
  }
  const dt = new Date(String(d));
  return isNaN(dt.getTime()) ? null : dt.toISOString();
}
function parseWorkbook(b64) {
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return readSync(bytes, { type: "array", cellDates: true });
}
function sheetRows(wb, name) {
  const ws = wb.Sheets[name];
  if (!ws) return [];
  return utils.sheet_to_json(ws, {
    header: 1,
    defval: null,
    raw: true
  });
}
function findSheet(wb, keywords) {
  for (const sn of wb.SheetNames) {
    const norm = sn.trim().toLowerCase();
    if (keywords.some((k) => norm.includes(k.toLowerCase()))) return sn;
  }
  return null;
}
async function parseAndImportReport(args) {
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
    "ماستر"
  ]);
  if (!qabdName || !salesName || !qtyName || !invName) {
    throw new Error(
      "ملف التحصيل يجب أن يحتوي على شيتات: قبض، مبيعات، كميات، فواتير"
    );
  }
  const custReportName = findSheet(wb2, ["تقرير مبيعات العملاء", "العملاء"]);
  if (!custReportName) {
    throw new Error(
      "ملف فواتير اليوم يجب أن يحتوي على شيت 'تقرير مبيعات العملاء'"
    );
  }
  const salesRows = sheetRows(wb1, salesName);
  const masterNames = /* @__PURE__ */ new Set();
  const masterBalances = /* @__PURE__ */ new Map();
  if (masterDataName) {
    const masterRows = sheetRows(wb1, masterDataName);
    let nameIdx = 1;
    let balanceIdx = 2;
    let headerRowIdx = 0;
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
        return (s.includes("العميل") || s.includes("اسم")) && !s.includes("كود");
      });
    }
    const balColIdx = headers.findIndex((h) => {
      const s = str(h);
      return s.includes("الرصيد الحالي") || s.includes("الرصيد") || s.includes("الحالي");
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
        if (existing === void 0 || existing === 0 && balVal !== 0) {
          masterBalances.set(normName, balVal);
        }
      }
    }
  }
  const sabeqName = findSheet(wb1, ["سابق"]);
  const sabeqBalances = /* @__PURE__ */ new Map();
  if (sabeqName) {
    const sabeqRows = sheetRows(wb1, sabeqName);
    let nameIdx = 0;
    let balanceIdx = 1;
    let headerRowIdx = 0;
    for (let i = 0; i < Math.min(20, sabeqRows.length); i++) {
      const row = sabeqRows[i] || [];
      if (row.some((cell) => {
        const s = str(cell);
        return s.includes("اسم") || s.includes("العميل") || s.includes("الاسم") || s.includes("بيان");
      })) {
        headerRowIdx = i;
        break;
      }
    }
    const headers = sabeqRows[headerRowIdx] || [];
    let nameColIdx = headers.findIndex((h) => str(h).includes("اسم العميل"));
    if (nameColIdx === -1) {
      nameColIdx = headers.findIndex((h) => {
        const s = str(h);
        return (s.includes("اسم") || s.includes("العميل") || s.includes("الاسم") || s.includes("بيان")) && !s.includes("كود");
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
        if (existing === void 0 || existing === 0 && balVal !== 0) {
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
  if (!reportDate) reportDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const totalsRow = salesRows[2] || [];
  const rawMaterialQty = num(totalsRow[1]);
  const totalQty = num(totalsRow[2]);
  const totalSalesFromSheet = num(totalsRow[3]);
  num(totalsRow[4]);
  const feedQty = num(totalsRow[6]);
  const salesCustomersMap = /* @__PURE__ */ new Map();
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
      invoice_count: 0
    };
    cur.sales += sales;
    cur.collected += collected;
    cur.prev_balance = prev;
    cur.balance = bal;
    cur.invoice_count += 1;
    salesCustomersMap.set(name, cur);
  }
  const invRows = sheetRows(wb1, invName);
  const invoices = [];
  const invoiceCountByCustomer = /* @__PURE__ */ new Map();
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
      total_amount: amt
    });
    if (cname)
      invoiceCountByCustomer.set(
        cname,
        (invoiceCountByCustomer.get(cname) || 0) + 1
      );
  }
  const qtyRows = sheetRows(wb1, qtyName);
  const productMap = /* @__PURE__ */ new Map();
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
  const customerProductsMap = /* @__PURE__ */ new Map();
  const customerSalesF2 = /* @__PURE__ */ new Map();
  const productTotalsF2 = /* @__PURE__ */ new Map();
  for (let i = 3; i < cust2Rows.length; i++) {
    const r = cust2Rows[i];
    if (!r || !r[0]) continue;
    const cname = str(r[0]);
    if (!cname || isExcludedCustomer(cname)) continue;
    const product = str(r[2]);
    const qty = num(r[4]);
    const total = num(r[5]);
    if (!product) continue;
    const cp = customerProductsMap.get(cname) || /* @__PURE__ */ new Map();
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
  }
  const qabdRows = sheetRows(wb1, qabdName);
  const collectedByCustomer = /* @__PURE__ */ new Map();
  let totalReceiptsFromQabd = 0;
  for (let i = 1; i < qabdRows.length; i++) {
    const r = qabdRows[i];
    if (!r) continue;
    const amt = num(r[2]);
    totalReceiptsFromQabd += amt;
    const name = str(r[0]);
    if (!name || isExcludedCustomer(name)) continue;
    const isCashClient = name.includes("نقد");
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
  const allCustomerNames = /* @__PURE__ */ new Set([
    ...salesCustomersMap.keys(),
    ...collectedByCustomer.keys(),
    ...customerSalesF2.keys()
  ]);
  const customers = [];
  for (const name of allCustomerNames) {
    if (isExcludedCustomer(name)) continue;
    const f2 = customerSalesF2.get(name);
    const fromSales = salesCustomersMap.get(name);
    const sales = Math.max(f2?.sales || 0, fromSales?.sales || 0);
    const rawCollected = Math.max(
      collectedByCustomer.get(name) || 0,
      fromSales?.collected || 0
    );
    const collected = rawCollected;
    const qty = f2?.qty ?? 0;
    const normName = normalizeArabicName(name);
    const prevBalance = sabeqBalances.get(normName) ?? fromSales?.prev_balance ?? 0;
    let outstanding = masterBalances.get(normName);
    if (outstanding === void 0)
      outstanding = prevBalance + sales - collected;
    const collectionRatio = sales > 0 ? collected / sales : 0;
    const invoiceCount = invoiceCountByCustomer.get(name) ?? fromSales?.invoice_count ?? 0;
    let riskScore = 0;
    if (collectionRatio < 0.25) riskScore += 50;
    else if (collectionRatio < 0.5) riskScore += 25;
    if (outstanding > 5e4) riskScore += 30;
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
      status
    });
  }
  const customerProducts = [];
  for (const [cname, products] of customerProductsMap.entries()) {
    for (const [pname, data2] of products.entries()) {
      customerProducts.push({
        customer_name: cname,
        product_name: pname,
        quantity: data2.qty,
        total_amount: data2.total
      });
    }
  }
  const allProducts = /* @__PURE__ */ new Set([
    ...productMap.keys(),
    ...productTotalsF2.keys()
  ]);
  const productAggregates = [];
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
      category
    });
  }
  let sumAllSales = 0;
  for (const name of allCustomerNames) {
    const f2 = customerSalesF2.get(name);
    const fromSales = salesCustomersMap.get(name);
    const sales = Math.max(f2?.sales || 0, fromSales?.sales || 0);
    Math.max(
      collectedByCustomer.get(name) || 0,
      fromSales?.collected || 0
    );
    sumAllSales += sales;
  }
  if (masterBalances.size > 0) {
    for (const bal of masterBalances.values()) {
    }
  } else {
    for (const name of allCustomerNames) {
      const f2 = customerSalesF2.get(name);
      const fromSales = salesCustomersMap.get(name);
      Math.max(f2?.sales || 0, fromSales?.sales || 0);
      Math.max(
        collectedByCustomer.get(name) || 0,
        fromSales?.collected || 0
      );
      const normName = normalizeArabicName(name);
      sabeqBalances.get(normName) ?? fromSales?.prev_balance ?? 0;
      masterBalances.get(normName);
    }
  }
  const totalCollectedFromTodayBuyers = customers.filter((c) => c.sales_amount > 0).reduce((sum, c) => sum + c.collected_amount, 0);
  const totalSales = totalSalesFromSheet || sumAllSales;
  const totalCollected = totalCollectedFromTodayBuyers;
  const finalTotalQty = totalQty || customers.reduce((sum, c) => sum + c.total_qty, 0);
  const collectionRate = totalSales > 0 ? totalCollectedFromTodayBuyers / totalSales : 0;
  const customerCount = new Set(
    invoices.map((inv) => inv.customer_name).filter(Boolean)
  ).size;
  const invoiceCountTotal = invoices.length;
  const averageInvoice = invoiceCountTotal > 0 ? totalSales / invoiceCountTotal : 0;
  const existingReports = await getLocalReports();
  const existingSameDate = existingReports.find(
    (r) => r.report.report_date === reportDate
  );
  const sortedChronologically = [...existingReports].sort(
    (a, b) => new Date(a.report.report_date).getTime() - new Date(b.report.report_date).getTime()
  );
  let defaultOpeningBalance = 0;
  const currentDateTime = new Date(reportDate).getTime();
  const previousReport = sortedChronologically.filter(
    (r) => new Date(r.report.report_date).getTime() < currentDateTime
  ).pop();
  if (previousReport) {
    defaultOpeningBalance = (previousReport.report.opening_balance || 0) + (previousReport.report.total_sales || 0) - (previousReport.report.total_collected || 0);
  }
  const finalOpeningBalance = existingSameDate ? existingSameDate.report.opening_balance || 0 : defaultOpeningBalance;
  const calculatedTotalReceivables = finalOpeningBalance + totalSales - totalReceiptsFromQabd;
  const reportId = await saveLocalReport({
    report: {
      id: existingSameDate ? existingSameDate.report.id : void 0,
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
      ai_summary: existingSameDate?.report.ai_summary || null
    },
    customers,
    products: productAggregates,
    customerProducts,
    invoices
  });
  return {
    reportId,
    reportDate,
    totalSales,
    totalCollected,
    customerCount,
    invoiceCount: invoiceCountTotal
  };
}
const Dialog = Dialog$1;
const DialogTrigger = DialogTrigger$1;
const DialogPortal = DialogPortal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay$1,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogOverlay$1.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogContent$1.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogTitle$1.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogDescription$1.displayName;
const firebaseConfig = {
  projectId: "gen-lang-client-0018644299",
  appId: "1:810426974836:web:96e928bbf18d4145660721",
  apiKey: "AIzaSyDC5TELKGzVXqz7OWLQf-FiRMUUDjDk_ng",
  authDomain: "gen-lang-client-0018644299.firebaseapp.com",
  storageBucket: "gen-lang-client-0018644299.firebasestorage.app",
  messagingSenderId: "810426974836",
  measurementId: "",
  oAuthClientId: "810426974836-6lq9pkbq9fkpg21e3ufollue1ifvgebj.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};
const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive.readonly");
provider.addScope("https://www.googleapis.com/auth/drive.file");
let isSigningIn = false;
let cachedAccessToken = null;
const initAuth = (onAuthSuccess, onAuthFailure) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};
const googleSignIn = async () => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get access token from Firebase Auth");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};
function GoogleDrivePicker({
  open,
  onOpenChange,
  onSelect
}) {
  const [needsAuth, setNeedsAuth] = reactExports.useState(true);
  const [token, setToken] = reactExports.useState(null);
  const [files, setFiles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [isLoggingIn, setIsLoggingIn] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    const unsub = initAuth(
      (_user, t) => {
        setNeedsAuth(false);
        setToken(t);
        if (open) fetchFiles(t);
      },
      () => setNeedsAuth(true)
    );
    return () => unsub();
  }, [open]);
  reactExports.useEffect(() => {
    if (open && token && !needsAuth) {
      fetchFiles(token);
    }
  }, [open, search]);
  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setNeedsAuth(false);
        fetchFiles(result.accessToken);
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("فشل تسجيل الدخول");
    } finally {
      setIsLoggingIn(false);
    }
  };
  const fetchFiles = async (accessToken) => {
    setLoading(true);
    try {
      let q = "mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' or mimeType='application/vnd.google-apps.spreadsheet' or mimeType='application/vnd.ms-excel.sheet.macroEnabled.12'";
      if (search) {
        q += ` and name contains '${search}'`;
      }
      const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&orderBy=modifiedTime desc&pageSize=50`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!res.ok) throw new Error("Failed to fetch files");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (e) {
      console.error(e);
      toast.error("فشل جلب الملفات من جوجل درايف");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md w-[95%] rounded-xl gap-4 p-5 sm:p-6", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-lg font-bold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-5 w-5 text-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اختر ملف من جوجل درايف" })
    ] }) }),
    needsAuth ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-8 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center", children: "يرجى تسجيل الدخول للوصول إلى ملفات جوجل درايف الخاصة بك." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleLogin, disabled: isLoggingIn, className: "w-full", children: [
        isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin ml-2" }) : null,
        "تسجيل الدخول باستخدام جوجل"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "ابحث عن ملف...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pr-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 overflow-y-auto space-y-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : files.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground text-sm", children: "لا توجد ملفات." }) : files.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-right",
          onClick: () => {
            if (token) onSelect(f.id, token, f.name);
            onOpenChange(false);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "h-6 w-6 text-emerald-500 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm truncate flex-1", children: f.name })
          ]
        },
        f.id
      )) })
    ] })
  ] }) });
}
function fileToB64(f) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const result = r.result;
      resolve(result.split(",")[1]);
    };
    r.onerror = () => reject(r.error);
    r.readAsDataURL(f);
  });
}
function UploadDialog({ onUploaded }) {
  const [collections, setCollections] = reactExports.useState(null);
  const [invoices, setInvoices] = reactExports.useState(null);
  const [date, setDate] = reactExports.useState(
    () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
  );
  const [loading, setLoading] = reactExports.useState(false);
  const [drivePickerOpen, setDrivePickerOpen] = reactExports.useState({ open: false, target: null });
  const [collectionsName, setCollectionsName] = reactExports.useState(null);
  const [invoicesName, setInvoicesName] = reactExports.useState(null);
  const [collectionsB64, setCollectionsB64] = reactExports.useState(null);
  const [invoicesB64, setInvoicesB64] = reactExports.useState(null);
  const collectionsRef = reactExports.useRef(null);
  const invoicesRef = reactExports.useRef(null);
  const isMounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  async function handleUpload() {
    if (!collections && !collectionsB64 || !invoices && !invoicesB64) {
      toast.error(
        "يرجى رفع ملفي التحصيل والفواتير."
      );
      return;
    }
    setLoading(true);
    try {
      const [c, i] = await Promise.all([
        collectionsB64 ? Promise.resolve(collectionsB64) : fileToB64(collections),
        invoicesB64 ? Promise.resolve(invoicesB64) : fileToB64(invoices)
      ]);
      const res = await parseAndImportReport({
        data: {
          collectionsB64: c,
          invoicesB64: i,
          reportDate: date || void 0
        }
      });
      toast.success(`تم استيراد تقرير ${res.reportDate}`);
      if (isMounted.current) {
        setCollections(null);
        setInvoices(null);
        setCollectionsB64(null);
        setInvoicesB64(null);
        setCollectionsName(null);
        setInvoicesName(null);
        setDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
        if (collectionsRef.current) collectionsRef.current.value = "";
        if (invoicesRef.current) invoicesRef.current.value = "";
        onUploaded();
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "فشل الاستيراد");
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }
  const handleDriveSelect = async (fileId, accessToken, fileName) => {
    setLoading(true);
    try {
      let res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=mimeType`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const metadata = await res.json();
      let downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
      if (metadata.mimeType === "application/vnd.google-apps.spreadsheet") {
        downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;
      }
      const fileRes = await fetch(downloadUrl, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!fileRes.ok) throw new Error("Failed to download file from Drive");
      const blob = await fileRes.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const b64 = reader.result.split(",")[1];
        if (drivePickerOpen.target === "collections") {
          setCollectionsB64(b64);
          setCollectionsName(fileName);
          setCollections(null);
          if (collectionsRef.current) collectionsRef.current.value = "";
        } else if (drivePickerOpen.target === "invoices") {
          setInvoicesB64(b64);
          setInvoicesName(fileName);
          setInvoices(null);
          if (invoicesRef.current) invoicesRef.current.value = "";
        }
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.error(e);
      toast.error("فشل تحميل الملف من جوجل درايف");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-end gap-3 p-4 rounded-lg border border-border bg-card/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GoogleDrivePicker,
      {
        open: drivePickerOpen.open,
        onOpenChange: (open) => setDrivePickerOpen((prev) => ({ ...prev, open })),
        onSelect: handleDriveSelect
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ملف التحصيل (xlsm/xlsx)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "h-6 text-xs px-2", onClick: () => setDrivePickerOpen({ open: true, target: "collections" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-3 w-3 ml-1" }),
          " درايف"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            ref: collectionsRef,
            type: "file",
            accept: ".xlsm,.xlsx",
            onChange: (e) => {
              setCollections(e.target.files?.[0] ?? null);
              setCollectionsB64(null);
              setCollectionsName(null);
            },
            className: collectionsB64 ? "opacity-0 absolute inset-0 w-full z-[-1]" : ""
          }
        ),
        collectionsB64 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border rounded-md px-3 py-2 text-sm bg-muted/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: collectionsName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "h-auto p-0 text-destructive", onClick: () => {
            setCollectionsB64(null);
            setCollectionsName(null);
          }, children: "إلغاء" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فواتير اليوم (xlsx)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "h-6 text-xs px-2", onClick: () => setDrivePickerOpen({ open: true, target: "invoices" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-3 w-3 ml-1" }),
          " درايف"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            ref: invoicesRef,
            type: "file",
            accept: ".xlsx",
            onChange: (e) => {
              setInvoices(e.target.files?.[0] ?? null);
              setInvoicesB64(null);
              setInvoicesName(null);
            },
            className: invoicesB64 ? "opacity-0 absolute inset-0 w-full z-[-1]" : ""
          }
        ),
        invoicesB64 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border rounded-md px-3 py-2 text-sm bg-muted/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: invoicesName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "h-auto p-0 text-destructive", onClick: () => {
            setInvoicesB64(null);
            setInvoicesName(null);
          }, children: "إلغاء" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-44 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "تاريخ التقرير (اختياري)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          value: date,
          onChange: (e) => setDate(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: handleUpload,
        disabled: loading,
        className: "w-full md:w-auto bg-gradient-to-r from-accent to-accent-foreground text-primary-dark shadow-accent-glow hover:scale-[0.98] transition-transform text-base",
        children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin ml-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 ml-2" }),
          "استيراد"
        ]
      }
    )
  ] });
}
function CustomerTable({
  customers,
  onSelect
}) {
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [sortKey, setSortKey] = reactExports.useState("sales_amount");
  const [asc, setAsc] = reactExports.useState(false);
  const rows = reactExports.useMemo(() => {
    let r = customers.filter((c) => c.invoice_count > 0 || c.sales_amount > 0);
    if (search) r = r.filter((c) => c.customer_name.includes(search));
    if (filter === "high_risk") r = r.filter((c) => c.risk_score >= 70);
    else if (filter === "medium_risk")
      r = r.filter((c) => c.risk_score >= 40 && c.risk_score < 70);
    else if (filter === "no_collection")
      r = r.filter((c) => c.collected_amount === 0 && c.sales_amount > 0);
    r = [...r].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === "number" && typeof valB === "number") {
        return asc ? valA - valB : valB - valA;
      }
      return 0;
    });
    return r;
  }, [customers, search, filter, sortKey, asc]);
  function toggleSort(k) {
    if (k === sortKey) setAsc(!asc);
    else {
      setSortKey(k);
      setAsc(false);
    }
  }
  function riskBadge(score) {
    if (score >= 70) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-destructive text-destructive-foreground shadow-coral-glow rounded-full px-3 py-1 text-xs font-bold animate-pulse", children: "عالي" });
    }
    if (score >= 40) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-warning text-warning-foreground shadow-accent-glow rounded-full px-3 py-1 text-xs font-bold", children: "متوسط" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-success text-success-foreground rounded-full px-3 py-1 text-xs font-bold", children: "منخفض" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-0 rounded-[24px] bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "gap-4 border-b-2 border-dashed border-primary/20 pb-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📋" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xl sm:text-2xl font-extrabold tracking-wide text-primary-dark", children: [
          "مبيعات العملاء (",
          rows.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 sm:flex-initial", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "w-full sm:w-48 pr-8 rounded-full bg-input border-primary/20 text-primary-dark font-medium",
              placeholder: "بحث...",
              value: search,
              onChange: (e) => setSearch(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap", children: ["all", "high_risk", "medium_risk", "no_collection"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: filter === f ? "default" : "outline",
            size: "sm",
            onClick: () => setFilter(f),
            className: "rounded-full font-bold",
            children: f === "all" ? "الكل" : f === "high_risk" ? "خطر عالي" : f === "medium_risk" ? "خطر متوسط" : "بدون تحصيل"
          },
          f
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "md:hidden space-y-3 p-4 bg-slate-50/50 dark:bg-slate-900/20",
          dir: "rtl",
          children: [
            rows.map((c, idx) => {
              const riskBorder = c.risk_score >= 70 ? "border-r-destructive" : c.risk_score >= 40 ? "border-r-warning" : "border-r-success";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card border border-border shadow-sm rounded-xl p-4 flex flex-col gap-3 border-r-4 " + riskBorder,
                  onClick: () => onSelect(c.customer_name),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-foreground text-base", children: c.customer_name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: riskBadge(c.risk_score) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-y-3 gap-x-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs font-semibold mb-1", children: "المبيعات" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-info dark:text-blue-400 tabular-nums", children: fmtMoney(c.sales_amount) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs font-semibold mb-1", children: "المحصل" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-success dark:text-emerald-400 tabular-nums", children: fmtMoney(c.collected_amount) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs font-semibold mb-1", children: "الرصيد السابق" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-muted-foreground tabular-nums", children: fmtMoney(c.prev_balance) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs font-semibold mb-1", children: "الرصيد الحالي" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "font-bold tabular-nums " + (c.outstanding_amount > 0 ? "text-destructive dark:text-rose-450" : c.outstanding_amount < 0 ? "text-success dark:text-emerald-400" : "text-foreground"),
                            children: fmtMoney(c.outstanding_amount)
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                        "الفواتير:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: c.invoice_count })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-xs tabular-nums text-foreground", children: fmtPct(c.collection_ratio) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-full rounded-full " + (c.collection_ratio >= 0.9 ? "bg-success" : c.collection_ratio >= 0.35 ? "bg-warning" : "bg-slate-200 dark:bg-slate-700"),
                            style: {
                              width: Math.min(
                                100,
                                Math.max(0, c.collection_ratio * 100)
                              ) + "%"
                            }
                          }
                        ) })
                      ] })
                    ] })
                  ]
                },
                c.id || c.customer_name
              );
            }),
            !rows.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground py-8 font-semibold", children: "لا توجد بيانات" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-auto", dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right w-12 font-bold text-foreground hidden md:table-cell", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right font-bold text-foreground", children: "العميل" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableHead,
            {
              onClick: () => toggleSort("sales_amount"),
              className: "cursor-pointer text-right font-bold text-foreground",
              children: [
                "المبيعات ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "inline h-3 w-3" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableHead,
            {
              onClick: () => toggleSort("collected_amount"),
              className: "cursor-pointer text-right font-bold text-foreground",
              children: "المحصل"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableHead,
            {
              onClick: () => toggleSort("prev_balance"),
              className: "cursor-pointer text-right font-bold text-foreground hidden lg:table-cell",
              children: "الرصيد السابق"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableHead,
            {
              onClick: () => toggleSort("outstanding_amount"),
              className: "cursor-pointer text-right font-bold text-foreground",
              children: "الرصيد الحالي"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableHead,
            {
              onClick: () => toggleSort("total_qty"),
              className: "cursor-pointer text-right font-bold text-foreground hidden md:table-cell",
              children: "الكمية"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableHead,
            {
              onClick: () => toggleSort("collection_ratio"),
              className: "cursor-pointer text-right font-bold text-foreground hidden lg:table-cell",
              children: "نسبة التحصيل"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right font-bold text-foreground hidden lg:table-cell", children: "الفواتير" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right font-bold text-foreground hidden sm:table-cell", children: "المخاطرة" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          rows.map((c, idx) => {
            const rowBorderClass = c.risk_score >= 70 ? "border-r-[6px] border-r-destructive" : c.risk_score >= 40 ? "border-r-[6px] border-r-warning" : "border-r-[6px] border-r-success";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TableRow,
              {
                className: "cursor-pointer hover:bg-secondary transition-colors " + rowBorderClass,
                onClick: () => onSelect(c.customer_name),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-muted-foreground tabular-nums font-semibold hidden md:table-cell", children: idx + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-bold text-right text-foreground", children: c.customer_name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-info dark:text-blue-400 font-bold tabular-nums", children: fmtMoney(c.sales_amount) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-success dark:text-emerald-400 text-right font-bold tabular-nums", children: fmtMoney(c.collected_amount) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-medium tabular-nums text-muted-foreground hidden lg:table-cell", children: fmtMoney(c.prev_balance) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TableCell,
                    {
                      className: "text-right font-bold tabular-nums " + (c.outstanding_amount > 0 ? "text-destructive dark:text-rose-450" : c.outstanding_amount < 0 ? "text-success dark:text-emerald-400" : "text-foreground"),
                      children: fmtMoney(c.outstanding_amount)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-medium tabular-nums text-foreground hidden md:table-cell", children: fmtNumber(c.total_qty, 2) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-[110px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 font-semibold text-xs text-right tabular-nums text-foreground", children: fmtPct(c.collection_ratio) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full " + (c.collection_ratio >= 0.9 ? "bg-success" : c.collection_ratio >= 0.35 ? "bg-warning" : "bg-slate-200 dark:bg-slate-700"),
                        style: {
                          width: Math.min(
                            100,
                            Math.max(0, c.collection_ratio * 100)
                          ) + "%"
                        }
                      }
                    ) })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-medium text-foreground hidden lg:table-cell", children: c.invoice_count }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right hidden sm:table-cell", children: riskBadge(c.risk_score) })
                ]
              },
              c.id || c.customer_name
            );
          }),
          !rows.length && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableCell,
            {
              colSpan: 10,
              className: "text-center text-muted-foreground py-8 font-semibold",
              children: "لا توجد بيانات"
            }
          ) })
        ] })
      ] }) })
    ] })
  ] });
}
const Sheet = Dialog$1;
const SheetPortal = DialogPortal$1;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay$1,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogOverlay$1.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent$1,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContent.displayName = DialogContent$1.displayName;
const SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogTitle$1.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogDescription$1.displayName;
const PRODUCT_ORDER = [
  "ذرة صفراء",
  "نخالة",
  "كسب",
  "فول صويا ٤٤٪",
  "دي دي جي إس",
  "فول صويا ٤٦٪",
  "رجيع كون",
  "جلوتوفيد",
  "علف النور تسمين",
  "علف النور حلاب",
  "كربونات البوتاسيوم",
  "بريمكس تسمين",
  "أملاح معدنية حلاب",
  "فيتامينات حلاب",
  "حجر جيري",
  "ثنائي فوسفات الكالسيوم",
  "أحادي فوسفات الكالسيوم",
  "ملح طعام",
  "مضاد سموم بيولوجي",
  "مضاد سموم كيميائي",
  "خميرة",
  "أكسيد الماغنسيوم",
  "بيكربونات الصوديوم",
  "م. التصنيع",
  "م. العمال",
  "م. النقل"
];
function normalizeProductName(name) {
  let s = name.replace(/أ/g, "ا").replace(/إ/g, "ا").replace(/آ/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/4/g, "٤").replace(/6/g, "٦").replace(/%/g, "٪");
  s = s.split(/\s+/).map((w) => {
    let word = w.replace(/^م\./, "");
    if (word.startsWith("ال")) word = word.substring(2);
    return word;
  }).join("");
  s = s.replace(/[^\u0621-\u064A0-9٤٦٪a-zA-Z]/g, "");
  if (s === "ديديجي") s = "ديديجياس";
  if (s.includes("رجيع")) s = "رجيعكون";
  return s;
}
const NORMALIZED_ORDER = PRODUCT_ORDER.map(normalizeProductName);
function getProductSortIndex(productName) {
  if (!productName) return 999;
  const normalized = normalizeProductName(productName);
  const index = NORMALIZED_ORDER.indexOf(normalized);
  if (index !== -1) return index;
  for (let i = 0; i < NORMALIZED_ORDER.length; i++) {
    if (normalized.includes(NORMALIZED_ORDER[i]) || NORMALIZED_ORDER[i].includes(normalized)) {
      return i;
    }
  }
  return 999;
}
function sortProducts(products, getName) {
  return [...products].sort((a, b) => {
    const nameA = getName(a) || "";
    const nameB = getName(b) || "";
    const indexA = getProductSortIndex(nameA);
    const indexB = getProductSortIndex(nameB);
    if (indexA !== indexB) {
      return indexA - indexB;
    }
    return nameA.localeCompare(nameB, "ar");
  });
}
function CustomerProductsDrawer({
  open,
  onClose,
  customer,
  products
}) {
  const total = products.reduce((s, p) => s + p.quantity, 0);
  const sortedProducts = sortProducts(products, (p) => p.product_name);
  const totalAmt = products.reduce((s, p) => s + p.total_amount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "left",
      className: "w-full sm:max-w-lg overflow-y-auto",
      dir: "rtl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { children: [
          "منتجات العميل: ",
          customer
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "إجمالي الكمية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg", children: fmtNumber(total, 2) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "إجمالي القيمة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg", children: fmtMoney(totalAmt) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-md border overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الصنف" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الكمية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "القيمة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "%" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
            sortedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: p.product_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: fmtNumber(p.quantity, 2) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: fmtMoney(p.total_amount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                total > 0 ? (p.quantity / total * 100).toFixed(1) : 0,
                "%"
              ] })
            ] }, i)),
            !products.length && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              TableCell,
              {
                colSpan: 4,
                className: "text-center py-6 text-muted-foreground",
                children: "لا توجد بيانات"
              }
            ) })
          ] })
        ] }) })
      ]
    }
  ) });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const generateAiSummary = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  reportId: stringType(),
  stats: objectType({
    report_date: stringType(),
    total_sales: numberType(),
    total_collected: numberType(),
    collection_rate: numberType(),
    total_receivables: numberType(),
    total_qty: numberType(),
    feed_qty: numberType(),
    raw_material_qty: numberType(),
    customer_count: numberType(),
    invoice_count: numberType(),
    average_invoice: numberType()
  }),
  yesterday: anyType().optional(),
  lastWeek: anyType().optional(),
  lastMonth: anyType().optional(),
  customers: anyType().optional()
}).parse(d)).handler(createSsrRpc("11d0f3e1b3fba4848212f85fb0c2d9530a93b4aa78618c1dc5f1c6843cbb252d"));
function AiSummaryCard({
  reportId,
  summary,
  onUpdate
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const genFn = useServerFn(generateAiSummary);
  const isMounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  async function generate() {
    setLoading(true);
    try {
      const full = await getLatestReportFull({ data: { reportId } });
      if (!full?.report) throw new Error("No report to summarize");
      const res = await genFn({
        data: {
          reportId: full.report.id,
          stats: full.report,
          yesterday: full.comparisons?.yesterday,
          lastWeek: full.comparisons?.lastWeek,
          lastMonth: full.comparisons?.lastMonth,
          customers: full.customers
        }
      });
      await saveAiSummaryLocally(reportId, res);
      if (isMounted.current) {
        onUpdate(res);
        toast.success("تم توليد التحليل");
      }
    } catch (e) {
      if (isMounted.current) {
        toast.error(e instanceof Error ? e.message : "فشل التوليد");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-accent-glow border-r-[6px] border-accent rounded-[24px] bg-gradient-to-br from-card to-secondary/40 overflow-hidden relative border-t-0 border-b-0 border-l-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between border-b-2 border-dashed border-primary/20 pb-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✨" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-extrabold tracking-wide text-foreground", children: "الملخص التنفيذي بالذكاء الاصطناعي" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: generate,
          disabled: loading,
          className: "rounded-full font-bold px-6 bg-gradient-to-r from-accent to-accent-dark text-accent-foreground shadow-accent-glow hover:scale-95 transition-transform",
          children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin ml-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 ml-1" }),
            summary ? "تحديث" : "توليد"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 text-sm font-medium", children: [
      !summary && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center py-6 text-base font-semibold", children: 'اضغط "توليد" لإنشاء تحليل تنفيذي شامل بناءً على بيانات اليوم.' }),
      summary?.executiveSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-2xl shadow-sm border border-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-extrabold text-lg mb-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "📊" }),
          " الخلاصة التنفيذية"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed text-base", children: summary.executiveSummary })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        summary?.salesInsights && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-r-4 border-info bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "font-extrabold text-info mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🚀" }),
            " تحليل المبيعات"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed text-base", children: summary.salesInsights })
        ] }),
        summary?.collectionInsights && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-r-4 border-success bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "font-extrabold text-success mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💰" }),
            " تحليل التحصيل"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed text-base", children: summary.collectionInsights })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-3", children: [
        !!summary?.risks?.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-r-4 border-destructive bg-destructive/5 p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "font-extrabold text-destructive mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "⚠️" }),
            " المخاطر"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 list-disc pr-5 font-semibold", children: summary.risks.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: r }, i)) })
        ] }),
        !!summary?.opportunities?.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-r-4 border-success bg-success/5 p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "font-extrabold text-success mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🌟" }),
            " الفرص"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 list-disc pr-5 font-semibold", children: summary.opportunities.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: r }, i)) })
        ] }),
        !!summary?.recommendations?.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-r-4 border-info bg-info/5 p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "font-extrabold text-info mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            " التوصيات"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 list-disc pr-5 font-semibold", children: summary.recommendations.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: r }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function PrintDialog({
  printLayout,
  setPrintLayout,
  trigger
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(printLayout);
  const [isIframe, setIsIframe] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);
  function handleStartPrint() {
    setPrintLayout(selected);
    setOpen(false);
    setTimeout(() => {
      const wasDark = document.documentElement.classList.contains("dark");
      if (wasDark) {
        document.documentElement.classList.remove("dark");
      }
      const restore = () => {
        if (wasDark) {
          document.documentElement.classList.add("dark");
        }
        window.removeEventListener("afterprint", restore);
      };
      window.addEventListener("afterprint", restore);
      try {
        window.print();
      } catch (e) {
        console.error("Print blocked or failed", e);
        toast.error(
          "فشلت عملية الطباعة. يرجى تجربة فتح التطبيق في نافذة مستقلة."
        );
      }
    }, 550);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger || /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "px-2 sm:px-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4 sm:ml-1 shrink-0 text-emerald-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "طباعة التقرير" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-md w-[95%] rounded-xl gap-4 p-5 sm:p-6",
        dir: "rtl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-lg font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-5 w-5 text-emerald-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إعداد وتنسيق طباعة التقرير" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-xs sm:text-sm text-muted-foreground", children: "اختر التنسيق والنموذج المناسب لطباعة هذا التقرير أو حفظه كـ PDF." })
          ] }),
          isIframe && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-3 sm:p-4 rounded-xl text-amber-800 dark:text-amber-300 text-xs sm:text-sm leading-relaxed space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تنبيه هام ومساعد للطباعة:" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-right", children: "بسبب قيود المتصفح الأمنية داخل نافذة المعاينة، **لن يتم عرض نافذة الطباعة مباشرة**." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "يرجى الضغط على الزر أدناه لفتح التطبيق في نافذة مستقلة لتفعيل خيارات الطباعة والحفظ كملف PDF بنجاح وبأعلى جودة:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "w-full flex items-center justify-center gap-2 border-amber-300 bg-amber-100 hover:bg-amber-200 text-amber-950 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200 font-bold rounded-xl py-2 mt-2 cursor-pointer no-print",
                onClick: () => window.open(window.location.href, "_blank"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "افتح في نافذة مستقلة وجديدة ↗" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 my-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs sm:text-sm font-bold text-foreground", children: "شكل وتصميم الطباعة:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelected("pc"),
                  className: `flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-xl text-center transition-all gap-2 bg-card cursor-pointer ${selected === "pc" ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-muted hover:border-muted-foreground/30"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-50 dark:bg-blue-950/30 text-blue-500 dark:text-blue-400 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-6 w-6" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm font-bold block text-foreground", children: "تنسيق شاشات الكمبيوتر" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] sm:text-xs text-muted-foreground block max-w-[150px] leading-tight", children: [
                      "(عرضي ممتد - A4 Landscape)",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "تنظيم البيانات عريضاً في صفوف كالبينتو جارد."
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelected("mobile"),
                  className: `flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-xl text-center transition-all gap-2 bg-card cursor-pointer ${selected === "mobile" ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-muted hover:border-muted-foreground/30"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-400 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-6 w-6" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm font-bold block text-foreground", children: "تنسيق المحمول والـ PDF الطولي" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] sm:text-xs text-muted-foreground block max-w-[150px] leading-tight", children: [
                      "(طولي مرتب - A4 Portrait)",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "يبسط العناصر بشكل عمودي لتكون واضحة ومقروءة جداً على الهاتف."
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex flex-col sm:flex-row-reverse gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all gap-1.5",
                onClick: handleStartPrint,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "عرض خيارات وبدء الطباعة" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "w-full sm:w-auto rounded-xl font-bold",
                onClick: () => setOpen(false),
                children: "إلغاء"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function exportReportToExcel(data) {
  const wb = utils.book_new();
  const r = data.report;
  const summary = [
    ["تقرير يوم", r.report_date],
    [],
    ["المؤشر", "القيمة"],
    ["إجمالي المبيعات", r.total_sales],
    ["إجمالي التحصيل", r.total_collected],
    ["نسبة التحصيل", `${(r.collection_rate * 100).toFixed(1)}%`],
    ["المديونية القديمة", r.opening_balance || 0],
    ["مديونية اليوم", r.total_receivables],
    [
      "إجمالي المديونية",
      (r.opening_balance || 0) + (r.total_sales || 0) - (r.total_collected || 0)
    ],
    ["إجمالي الكميات (كيلو)", r.total_qty],
    ["كميات الخامات", r.raw_material_qty],
    ["كميات الأعلاف", r.feed_qty],
    ["عدد العملاء", r.customer_count],
    ["عدد الفواتير", r.invoice_count],
    ["متوسط الفاتورة", r.average_invoice]
  ];
  const wsSummary = utils.aoa_to_sheet(summary);
  wsSummary["!cols"] = [{ wch: 28 }, { wch: 20 }];
  utils.book_append_sheet(wb, wsSummary, "ملخص");
  const todayCustomers = data.customers.filter((c) => c.invoice_count > 0);
  const customersRows = [
    [
      "#",
      "العميل",
      "المبيعات",
      "المحصل",
      "المتأخر",
      "الكمية (كيلو)",
      "نسبة التحصيل",
      "الفواتير",
      "درجة المخاطرة",
      "الحالة"
    ],
    ...todayCustomers.sort((a, b) => b.sales_amount - a.sales_amount).map((c, i) => [
      i + 1,
      c.customer_name,
      c.sales_amount,
      c.collected_amount,
      c.outstanding_amount,
      c.total_qty,
      `${(c.collection_ratio * 100).toFixed(1)}%`,
      c.invoice_count,
      c.risk_score,
      c.status
    ])
  ];
  const wsCustomers = utils.aoa_to_sheet(customersRows);
  wsCustomers["!cols"] = [
    { wch: 5 },
    { wch: 30 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 12 },
    { wch: 14 },
    { wch: 10 },
    { wch: 14 },
    { wch: 14 }
  ];
  utils.book_append_sheet(wb, wsCustomers, "العملاء");
  const productsRows = [
    ["#", "المنتج", "الفئة", "الكمية", "القيمة"],
    ...data.products.sort((a, b) => b.total_qty - a.total_qty).map((p, i) => [
      i + 1,
      p.product_name,
      p.category || "—",
      p.total_qty,
      p.total_amount
    ])
  ];
  const wsProducts = utils.aoa_to_sheet(productsRows);
  wsProducts["!cols"] = [
    { wch: 5 },
    { wch: 30 },
    { wch: 16 },
    { wch: 12 },
    { wch: 14 }
  ];
  utils.book_append_sheet(wb, wsProducts, "المنتجات");
  if (data.customerProducts?.length) {
    const cpRows = [
      ["العميل", "المنتج", "الكمية", "القيمة"],
      ...data.customerProducts.map((cp) => [
        cp.customer_name,
        cp.product_name,
        cp.quantity,
        cp.total_amount
      ])
    ];
    const wsCP = utils.aoa_to_sheet(cpRows);
    wsCP["!cols"] = [{ wch: 28 }, { wch: 28 }, { wch: 12 }, { wch: 14 }];
    utils.book_append_sheet(wb, wsCP, "مبيعات العملاء");
  }
  writeFileSync(wb, `تقرير-${r.report_date}.xlsx`);
}
const DRIVE_URL = "https://drive.google.com/uc?export=download&id=1IlcAYY82Qyi594JHm4ZPmPmIuBf3Hf3u";
async function fetchSeed() {
  try {
    const res = await fetch(DRIVE_URL, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && Array.isArray(data.sales) && Array.isArray(data.collections)) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}
function seedToReport(seed) {
  const meta = seed.meta;
  const now = meta.lastUpdated || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const allSales = seed.sales || [];
  const allCol = seed.collections || [];
  const totalSales = allSales.reduce((s, r) => s + (r.total || 0), 0);
  const totalCollected = allCol.reduce((s, r) => s + (r.total || 0), 0);
  const customerMap = /* @__PURE__ */ new Map();
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
        status: "active"
      });
    }
    const c = customerMap.get(key);
    c.sales_amount += s.total || 0;
  }
  for (const c of allCol) {
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
        status: "collected_only"
      });
    }
  }
  for (const [_, cust] of customerMap) {
    cust.outstanding_amount = cust.sales_amount - cust.collected_amount;
    cust.collection_ratio = cust.sales_amount > 0 ? cust.collected_amount / cust.sales_amount : 0;
    cust.risk_score = cust.outstanding_amount > 1e5 ? 75 : cust.outstanding_amount > 5e4 ? 50 : 0;
    cust.customer_name = cust.customer_name?.replace(" /", "/").replace("/ ", "/") || "";
  }
  const customers = Array.from(customerMap.values()).map((c, i) => ({
    id: String(i + 1),
    ...c
  }));
  const customerCount = customers.length;
  const collectionRate = totalSales > 0 ? totalCollected / totalSales : 0;
  const totalReceivables = totalSales - totalCollected;
  const history = [];
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
  const products = [
    { id: "1", product_name: "مواد خام", total_qty: 0, total_amount: totalSales * 0.6, category: "مواد خام" },
    { id: "2", product_name: "علف", total_qty: 0, total_amount: totalSales * 0.4, category: "علف" }
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
      ai_summary: null
    },
    customers,
    products,
    customerProducts: [],
    comparisons: {
      yesterday: null,
      lastWeek: null,
      lastMonth: null
    },
    history
  };
}
async function autoInjectFromDrive() {
  try {
    const seed = await fetchSeed();
    if (!seed) {
      console.log("[auto-inject] No Drive data available");
      return { injected: false };
    }
    const lastUpdated = seed.meta?.lastUpdated || "";
    const reportId = "drive-auto-" + lastUpdated;
    const existing = await getLocalReports();
    const alreadyExists = existing.some((r) => r.report?.id === reportId);
    if (alreadyExists) {
      console.log("[auto-inject] Drive data already in IndexedDB");
      return { injected: false, reportId };
    }
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
function pctDiff(curr, prev) {
  if (prev === void 0 || prev === null || prev === 0) return void 0;
  return (curr - prev) / prev * 100;
}
function Dashboard() {
  const {
    reportId
  } = Route$1.useSearch();
  const [autoReady, setAutoReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    autoInjectFromDrive().finally(() => setAutoReady(true));
  }, []);
  const {
    data,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["latestReport", reportId, autoReady],
    queryFn: () => getLatestReportFull({
      data: {
        reportId
      }
    }),
    enabled: autoReady
  });
  const [dark, setDark] = reactExports.useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const [printLayout, setPrintLayout] = reactExports.useState("pc");
  const [selectedCustomer, setSelectedCustomer] = reactExports.useState(null);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }
  const customerProductsForSelected = reactExports.useMemo(() => {
    if (!selectedCustomer || !data) return [];
    return (data.customerProducts || []).filter((p) => p.customer_name === selectedCustomer);
  }, [selectedCustomer, data]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center", dir: "rtl", children: "جاري التحميل..." });
  function handleExport() {
    if (!data) {
      toast.error("لا توجد بيانات للتصدير");
      return;
    }
    try {
      exportReportToExcel(data);
      toast.success("تم تصدير الملف");
    } catch (e) {
      toast.error("فشل التصدير");
      console.error(e);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-screen bg-background print-layout-${printLayout}`, dir: "rtl", children: [
    printLayout === "pc" ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: {
      __html: "@media print { @page { size: A4 landscape !important; margin: 6mm 10mm !important; } }"
    } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: {
      __html: "@media print { @page { size: A4 portrait !important; margin: 10mm 10mm !important; } }"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-10 border-b-4 border-primary/20 bg-card/90 backdrop-blur no-print overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none opacity-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 w-32 h-48 bg-primary rounded-xl rotate-12" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 right-10 w-32 h-48 bg-accent rounded-xl -rotate-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-8 right-24 w-32 h-48 bg-destructive rounded-xl rotate-[24deg]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-accent text-accent-foreground p-2 rounded-2xl shadow-accent-glow -rotate-3 border-b-4 border-accent-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-6 w-6 sm:h-8 sm:w-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-black text-primary-dark tracking-wide rotate-1", children: "لوحة التحكم التنفيذية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-2 -left-2 -right-2 h-2 bg-accent/20 -skew-x-12 rounded" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 sm:gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleExport, className: "px-3 sm:px-4 rounded-full font-bold bg-white shadow-sm border border-muted hover:border-primary/30", title: "تصدير Excel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 sm:ml-2 text-info" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "تصدير" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/history", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "px-3 sm:px-4 rounded-full font-bold bg-white shadow-sm border border-muted hover:border-primary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4 sm:ml-2 text-accent-dark" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "السجل" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PrintDialog, { printLayout, setPrintLayout }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResetButton, { onDone: () => refetch() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: toggleTheme, className: "rounded-full bg-white shadow-sm border border-muted hover:border-primary/30 ml-2", children: dark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4 text-primary" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print-only px-4 py-3 border-b", dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold", children: "لوحة التحكم التنفيذية — المبيعات والتحصيل" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
        "تاريخ الطباعة:",
        " ",
        (/* @__PURE__ */ new Date()).toLocaleString("ar-EG-u-nu-latn", {
          dateStyle: "full",
          timeStyle: "short"
        })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 print:space-y-4 print:p-0 print:m-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-print", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UploadDialog, { onUploaded: () => {
        refetch();
        toast.success("تم التحديث");
      } }) }),
      !data && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-12 text-center text-muted-foreground", children: "لا توجد تقارير مستوردة بعد. ارفع ملفاتك للبدء." }) }),
      data && /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardContent, { data, onCustomerSelect: setSelectedCustomer, onUpdateSummary: () => refetch() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerProductsDrawer, { open: !!selectedCustomer, onClose: () => setSelectedCustomer(null), customer: selectedCustomer, products: customerProductsForSelected })
  ] });
}
const CATEGORY_COLORS = ["#10b981", "#2563eb", "#7c3aed", "#d97706", "#dc2626"];
function DashboardContent({
  data,
  onCustomerSelect,
  onUpdateSummary
}) {
  const r = data.report;
  const y = data.comparisons.yesterday;
  const w = data.comparisons.lastWeek;
  const m = data.comparisons.lastMonth;
  const getReportTotalDebt = (report) => {
    if (!report) return 0;
    return report.total_receivables ?? (report.opening_balance || 0) + (report.total_sales || 0) - (report.total_receipts_qabd ?? report.total_collected ?? 0);
  };
  const totalDebt = getReportTotalDebt(r);
  const todayCustomers = data.customers.filter((c) => c.sales_amount > 0);
  const topBySales = [...todayCustomers].sort((a, b) => b.sales_amount - a.sales_amount).slice(0, 10);
  const topByCollection = [...todayCustomers].sort((a, b) => b.collected_amount - a.collected_amount).slice(0, 10);
  const topByQty = [...todayCustomers].sort((a, b) => b.total_qty - a.total_qty).slice(0, 10);
  const topDebtors = [...todayCustomers].filter((c) => c.outstanding_amount > 0).sort((a, b) => b.outstanding_amount - a.outstanding_amount).slice(0, 10);
  const top3Sales = topBySales.slice(0, 3).reduce((s, c) => s + c.sales_amount, 0);
  const concentrationPct = r.total_sales > 0 ? top3Sales / r.total_sales * 100 : 0;
  [...data.products].sort((a, b) => b.total_qty - a.total_qty).slice(0, 10);
  [...data.products].filter((p) => p.total_qty > 0).sort((a, b) => a.total_qty - b.total_qty).slice(0, 5);
  data.products.reduce((s, p) => s + p.total_qty, 0);
  const noCollection = todayCustomers.filter((c) => c.sales_amount > 0 && c.collected_amount === 0);
  const highRisk = todayCustomers.filter((c) => c.risk_score >= 70);
  const categoryDistribution = reactExports.useMemo(() => {
    const categories = [{
      category: "خامات",
      total_qty: r.raw_material_qty || 0
    }, {
      category: "علف",
      total_qty: r.feed_qty || 0
    }].filter((c) => c.total_qty > 0);
    let total = categories.reduce((acc, curr) => acc + curr.total_qty, 0);
    if (!total) total = 1;
    return categories.map((c, index) => ({
      name: c.category,
      value: c.total_qty,
      pct: c.total_qty / total,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
    }));
  }, [r.raw_material_qty, r.feed_qty]);
  const {
    productSalesData,
    productMaxQty
  } = reactExports.useMemo(() => {
    let list = [...data.products].filter((p) => p.total_qty > 0 && !["تصنيع", "عمال", "نقل"].includes(p.product_name.trim())).sort((a, b) => b.total_qty - a.total_qty).map((p) => {
      let color = "#3b82f6";
      if (/ذره|ذرة/.test(p.product_name)) color = "#2563eb";
      else if (/نخاله|نخالة|ردة/.test(p.product_name)) color = "#0e7490";
      else if (/صويا/.test(p.product_name)) color = "#7c3aed";
      else if (/كسب/.test(p.product_name)) color = "#d97706";
      else if (/رجيع/.test(p.product_name)) color = "#dc2626";
      else if (/دي دي/.test(p.product_name)) color = "#10b981";
      else if (/حلاب/.test(p.product_name)) color = "#3b82f6";
      else if (/بريمكس/.test(p.product_name)) color = "#a855f7";
      return {
        name: p.product_name,
        qty: p.total_qty,
        amount: p.total_amount,
        color
      };
    });
    list = sortProducts(list, (p) => p.name);
    const productMaxQty2 = list.length > 0 ? Math.max(...list.map((p) => p.qty)) : 1;
    return {
      productSalesData: list,
      productMaxQty: productMaxQty2
    };
  }, [data.products]);
  const historyChart = [...data.history].reverse().slice(-15).map((h) => ({
    date: h.report_date.slice(5),
    sales: h.total_sales,
    collected: h.total_collected
  }));
  const alerts = [];
  if (concentrationPct > 50) alerts.push({
    type: "danger",
    title: "تركيز مبيعات مرتفع",
    msg: `أعلى 3 عملاء يمثلون ${concentrationPct.toFixed(1)}% من المبيعات`
  });
  if (r.collection_rate < 0.5 && r.total_sales > 0) alerts.push({
    type: "warning",
    title: "نسبة تحصيل منخفضة",
    msg: `نسبة التحصيل اليوم ${fmtPct(r.collection_rate)}`
  });
  const colDiff = y ? pctDiff(r.total_collected, y.total_collected) : void 0;
  if (colDiff !== void 0 && colDiff < -20) alerts.push({
    type: "warning",
    title: "تراجع التحصيل",
    msg: `انخفاض ${Math.abs(colDiff).toFixed(1)}% عن أمس`
  });
  const recDiff = y ? pctDiff(r.total_receivables, y.total_receivables) : void 0;
  if (recDiff !== void 0 && recDiff > 10) alerts.push({
    type: "warning",
    title: "نمو الذمم",
    msg: `زيادة الذمم بـ ${recDiff.toFixed(1)}%`
  });
  if (noCollection.length > 5) alerts.push({
    type: "info",
    title: "عملاء بدون تحصيل",
    msg: `${noCollection.length} عميل بمبيعات بدون أي تحصيل`
  });
  if (highRisk.length > 0) alerts.push({
    type: "danger",
    title: "عملاء خطر عالي",
    msg: `${highRisk.length} عميل ضمن المخاطر العالية`
  });
  if (m && pctDiff(r.total_sales, m.total_sales) < -15) alerts.push({
    type: "warning",
    title: "تراجع المبيعات شهرياً",
    msg: `انخفاض ${Math.abs(pctDiff(r.total_sales, m.total_sales)).toFixed(1)}% عن الشهر الماضي`
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold", children: [
        "تقرير يوم",
        " ",
        new Date(r.report_date).toLocaleDateString("ar-EG-u-nu-latn", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OpeningBalanceEditor, { reportId: r.id, value: r.opening_balance || 0, onUpdated: onUpdateSummary })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 print:grid-cols-4 gap-3 print:gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "إجمالي المبيعات", value: fmtMoney(r.total_sales), tone: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }), diff: pctDiff(r.total_sales, y?.total_sales), diffLabel: "عن أمس" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "إجمالي التحصيل", value: fmtMoney(r.total_collected_from_sheet ?? r.total_collected), tone: "success", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5" }), diff: pctDiff(r.total_collected_from_sheet ?? r.total_collected, y ? y.total_collected_from_sheet ?? y.total_collected : void 0), diffLabel: "عن أمس" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "نسبة التحصيل", value: fmtPct(r.collection_rate), tone: r.collection_rate >= 0.7 ? "success" : r.collection_rate >= 0.4 ? "warning" : "danger", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "إجمالي المديونية", value: fmtMoney(totalDebt), tone: "danger", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5" }), diff: y ? pctDiff(totalDebt, getReportTotalDebt(y)) : void 0, diffLabel: "عن أمس" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "إجمالي الكميات (كيلو)", value: fmtNumber(r.total_qty, 2), tone: "default", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-5 w-5" }), diff: pctDiff(r.total_qty, y?.total_qty), diffLabel: "عن أمس" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "كميات الخامات", value: fmtNumber(r.raw_material_qty, 2), tone: "default", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "كميات الأعلاف", value: fmtNumber(r.feed_qty, 2), tone: "default", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "عدد العملاء", value: fmtNumber(r.customer_count), tone: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "عدد الفواتير", value: fmtNumber(r.invoice_count), tone: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "متوسط الفاتورة", value: fmtMoney(r.average_invoice), tone: "default", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerTable, { customers: data.customers, onSelect: onCustomerSelect }),
    concentrationPct > 50 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-r-[6px] border-destructive bg-destructive/5 rounded-[24px] shadow-coral-glow overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-8 w-8 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-destructive", children: "تنبيه: تركيز عالي في المبيعات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "أعلى 3 عملاء يمثلون ",
          concentrationPct.toFixed(1),
          "% من إجمالي المبيعات — خطر اعتمادية مرتفع."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AiSummaryCard, { reportId: r.id, summary: r.ai_summary, onUpdate: onUpdateSummary }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-0 rounded-[24px] overflow-hidden bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4 border-b-2 border-dashed border-primary/20 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-extrabold flex items-center justify-between w-full text-primary-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📈" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "توزيع المبيعات (خامات / أعلاف) 📊" })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { style: {
          height: 260
        }, className: "flex flex-col justify-between", children: categoryDistribution.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-muted-foreground text-sm", children: "لا توجد بيانات كافية للتصنيف" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col justify-center relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: categoryDistribution, cx: "50%", cy: "50%", innerRadius: 65, outerRadius: 85, paddingAngle: 6, dataKey: "value", stroke: "none", cornerRadius: 4, children: categoryDistribution.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
              borderRadius: "8px",
              border: "1px solid hsl(var(--border))",
              backgroundColor: "hsl(var(--background))"
            }, itemStyle: {
              fontWeight: "bold",
              fontSize: "13px"
            }, formatter: (value) => [`${fmtNumber(value, 2)} كيلو`, "الكمية"] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-foreground tabular-nums", children: fmtNumber(categoryDistribution.reduce((acc, curr) => acc + curr.value, 0), 0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-semibold", children: "كيلو" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-6 text-sm font-bold mt-1", children: categoryDistribution.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded-sm shrink-0", style: {
              backgroundColor: entry.color
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs font-bold", children: [
              entry.name,
              " (",
              fmtNumber(entry.value, 1),
              " كيلو)"
            ] })
          ] }, entry.name)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-0 rounded-[24px] overflow-hidden bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4 border-b-2 border-dashed border-primary/20 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-extrabold flex items-center justify-between w-full text-primary-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📈" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اتجاه المبيعات والتحصيل 📈" })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { style: {
          height: 260
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: historyChart, margin: {
          top: 10,
          right: 10,
          left: -20,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "colorSales", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "var(--color-info)", stopOpacity: 0.4 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "var(--color-info)", stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "colorCollected", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "var(--color-success)", stopOpacity: 0.4 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "var(--color-success)", stopOpacity: 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.15, vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", reversed: true, tick: {
            fontSize: 12,
            fill: "hsl(var(--muted-foreground))"
          }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickFormatter: (val) => `${(val / 1e3).toFixed(0)}k`, tick: {
            fontSize: 12,
            fill: "hsl(var(--muted-foreground))"
          }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
            backgroundColor: "hsl(var(--background))"
          }, itemStyle: {
            fontWeight: "bold",
            fontSize: "13px"
          }, formatter: (value) => [`${value.toLocaleString()} ج.م`, void 0], labelStyle: {
            color: "hsl(var(--muted-foreground))",
            marginBottom: "4px",
            fontSize: "13px"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { iconType: "circle", wrapperStyle: {
            fontSize: 12,
            fontWeight: "bold"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "sales", stroke: "var(--color-info)", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorSales)", name: "المبيعات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "collected", stroke: "var(--color-success)", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorCollected)", name: "التحصيل" })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 print:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopList, { title: "أكبر 10 عملاء بالمبيعات", items: topBySales.map((c) => ({
        name: c.customer_name,
        value: fmtMoney(c.sales_amount)
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopList, { title: "أكبر 10 محصلين", items: topByCollection.map((c) => ({
        name: c.customer_name,
        value: fmtMoney(c.collected_amount)
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopList, { title: "أكبر 10 بالكميات (كيلو)", items: topByQty.map((c) => ({
        name: c.customer_name,
        value: fmtNumber(c.total_qty, 2)
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopList, { title: "أكبر 10 مديونين", items: topDebtors.map((c) => ({
        name: c.customer_name,
        value: fmtMoney(c.outstanding_amount)
      })), tone: "destructive" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-0 rounded-[24px] overflow-hidden bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4 border-b-2 border-dashed border-primary/20 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-extrabold flex flex-row-reverse items-center gap-2 text-foreground justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تفصيل المنتجات (كميات وقيم)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-5 w-5 text-emerald-500 shrink-0" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 py-2", children: productSalesData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center text-muted-foreground text-sm", children: "لا توجد مبيعات أصناف" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", dir: "rtl", children: productSalesData.map((p) => {
        const percentage = p.qty / productMaxQty * 100;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2 py-0.5 bg-transparent hover:bg-slate-50/50 dark:hover:bg-slate-900/40 rounded transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800 pb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full sm:w-40 text-right font-bold text-sm text-foreground truncate shrink-0", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-6 bg-slate-100 dark:bg-slate-900 rounded overflow-hidden relative flex flex-row-reverse items-center justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded flex items-center justify-end px-3 font-extrabold text-[11px] sm:text-xs text-white shadow-xs transition-style duration-500 shrink-0", style: {
            width: `${percentage}%`,
            backgroundColor: p.color,
            minWidth: p.qty > 0 ? "80px" : "0px"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums font-black whitespace-nowrap", children: [
            fmtNumber(p.qty, 1),
            " كيلو"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full sm:w-32 text-left font-extrabold text-sm text-foreground/80 shrink-0 flex items-center justify-end gap-1 tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmtMoney(p.amount) }) })
        ] }, p.name);
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-accent" }),
        "محرك التنبيهات"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        !alerts.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "لا توجد تنبيهات حرجة. الأمور تسير بشكل طبيعي." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-2 print:grid-cols-2", children: alerts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-3 rounded-md border flex gap-2 ${a.type === "danger" ? "border-destructive/40 bg-destructive/5" : a.type === "warning" ? "border-warning/40 bg-warning/5" : "border-info/40 bg-info/5"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: `h-5 w-5 shrink-0 ${a.type === "danger" ? "text-destructive" : a.type === "warning" ? "text-warning" : "text-info"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: a.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: a.msg })
          ] })
        ] }, a.title)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base sm:text-lg font-extrabold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-5 w-5 text-accent" }),
        "مقارنة زمنية"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto rounded-lg border border-slate-100 dark:border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-base border-collapse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800", children: "المؤشر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800", children: "اليوم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800", children: "أمس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800", children: "نفس اليوم الأسبوع الماضي" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800", children: "الشهر الماضي" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: ["total_sales", "total_collected", "total_qty", "total_receivables"].map((k) => {
          const getVal = (report) => {
            if (!report) return null;
            if (k === "total_receivables") {
              return getReportTotalDebt(report);
            }
            return report[k];
          };
          const todayVal = getVal(r);
          const yestVal = getVal(y);
          const weekVal = getVal(w);
          const monthVal = getVal(m);
          const renderCell = (val, isToday = false) => {
            if (val === null || val === void 0) return "—";
            const formatted = k === "total_qty" ? fmtNumber(val, 2) : fmtMoney(val);
            return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isToday ? "font-extrabold text-primary" : "font-bold text-foreground/85", children: formatted });
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-bold text-sm sm:text-base text-right text-foreground", children: k === "total_sales" ? "المبيعات" : k === "total_collected" ? "التحصيل" : k === "total_qty" ? "الكميات كجم" : "إجمالي المديونية (الذمم)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center text-sm sm:text-base tabular-nums", children: renderCell(todayVal, true) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center text-sm sm:text-base tabular-nums", children: renderCell(yestVal) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center text-sm sm:text-base tabular-nums border-x border-slate-50 dark:border-slate-800/20", children: renderCell(weekVal) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center text-sm sm:text-base tabular-nums", children: renderCell(monthVal) })
          ] }, k);
        }) })
      ] }) }) })
    ] })
  ] });
}
function OpeningBalanceEditor({
  reportId,
  value,
  onUpdated
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [val, setVal] = reactExports.useState(String(value || 0));
  const [saving, setSaving] = reactExports.useState(false);
  const isMounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  reactExports.useEffect(() => {
    setVal(String(value || 0));
  }, [value]);
  async function save() {
    const num2 = parseFloat(val);
    if (isNaN(num2) || num2 < 0) {
      toast.error("قيمة غير صحيحة");
      return;
    }
    setSaving(true);
    try {
      await updateOpeningBalance({
        data: {
          reportId,
          openingBalance: num2
        }
      });
      toast.success("تم تحديث المديونية القديمة");
      if (isMounted.current) {
        setEditing(false);
        onUpdated();
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "فشل التحديث");
    } finally {
      if (isMounted.current) {
        setSaving(false);
      }
    }
  }
  if (!editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(true), className: "text-xs sm:text-sm px-3 py-1.5 rounded-md border bg-card hover:bg-muted/50 transition flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "المديونية القديمة:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold tabular-nums", children: fmtMoney(value || 0) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-[10px]", children: "(تعديل)" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, step: "0.01", value: val, onChange: (e) => setVal(e.target.value), className: "w-40 px-2 py-1.5 text-sm border rounded-md bg-background", placeholder: "المديونية القديمة" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: save, disabled: saving, children: "حفظ" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
      setEditing(false);
      setVal(String(value || 0));
    }, children: "إلغاء" })
  ] });
}
function TopList({
  title,
  items,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-1.5 text-sm", children: [
      items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-muted text-xs flex items-center justify-center shrink-0", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: it.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold tabular-nums ${tone === "destructive" ? "text-destructive" : ""}`, children: it.value })
      ] }, it.name)),
      !items.length && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-muted-foreground text-center py-2", children: "لا توجد بيانات" })
    ] }) })
  ] });
}
function ResetButton({
  onDone
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const isMounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  async function handleReset() {
    setLoading(true);
    try {
      await resetAllReports();
      toast.success("تم تصفير جميع السجلات");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "فشل التصفير");
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "px-2 sm:px-3 text-destructive hover:text-destructive", title: "تصفير", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 sm:ml-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "تصفير" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "تصفير جميع السجلات؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "سيتم حذف جميع التقارير اليومية والعملاء والمنتجات والمديونية القديمة نهائياً. هذا الإجراء لا يمكن التراجع عنه." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleReset, disabled: loading, className: "bg-destructive hover:bg-destructive/90", children: loading ? "جاري التصفير..." : "نعم، صفّر الكل" })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
