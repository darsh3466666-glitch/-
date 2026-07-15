import { R as React, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button, C as Card, a as CardHeader, b as CardTitle, c as CardContent, T as Table, d as TableHeader, e as TableRow, f as TableHead, g as TableBody, h as TableCell, i as fmtMoney, j as fmtPct, k as deleteReport, l as listReports } from "./formatters-BWTcDPT3.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowRight, E as Eye, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/idb-keyval.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function HistoryPage() {
  const navigate = useNavigate();
  const {
    data,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ["allReports"],
    queryFn: () => listReports()
  });
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  async function remove(id, date) {
    if (!confirm(`حذف تقرير ${date}؟`)) return;
    try {
      await deleteReport({
        data: {
          reportId: id
        }
      });
      if (isMounted.current) {
        toast.success("تم الحذف");
        refetch();
      }
    } catch (e) {
      if (isMounted.current) {
        toast.error(e instanceof Error ? e.message : "فشل الحذف");
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold", children: "سجل التقارير" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => navigate({
        to: "/dashboard"
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1" }),
        "الرئيسية"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "كل التقارير" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "جاري التحميل..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "التاريخ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "المبيعات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "التحصيل" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "النسبة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الذمم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "الكميات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "العملاء" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "إجراءات" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          data?.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-right py-3", children: r.report_date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "tabular-nums font-semibold text-right", children: fmtMoney(r.total_sales) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "tabular-nums font-semibold text-success text-right", children: fmtMoney(r.total_collected) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "tabular-nums font-semibold text-right", children: fmtPct(r.collection_rate) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "tabular-nums font-semibold text-destructive text-right", children: fmtMoney((r.opening_balance || 0) + (r.total_sales || 0) - (r.total_collected || 0)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "tabular-nums font-semibold text-right", children: r.total_qty.toLocaleString(void 0, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "tabular-nums font-semibold text-right", children: r.customer_count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => navigate({
                to: "/dashboard",
                search: {
                  reportId: r.id
                }
              }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => remove(r.id, r.report_date), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] }) })
          ] }, r.id)),
          !data?.length && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "text-center py-8 text-muted-foreground", children: "لا توجد تقارير" }) })
        ] })
      ] }) }) })
    ] }) })
  ] });
}
export {
  HistoryPage as component
};
