import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  getLatestReportFull,
  updateOpeningBalance,
  resetAllReports,
} from "@/lib/reports.functions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { fmtMoney, fmtNumber, fmtPct } from "@/lib/formatters";
import { UploadDialog } from "@/components/dashboard/UploadDialog";
import { CustomerTable } from "@/components/dashboard/CustomerTable";
import { CustomerProductsDrawer } from "@/components/dashboard/CustomerProductsDrawer";
import { AiSummaryCard } from "@/components/dashboard/AiSummaryCard";
import { PrintDialog } from "@/components/dashboard/PrintDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Wallet,
  Percent,
  AlertCircle,
  Package,
  Users,
  FileText,
  Receipt,
  Moon,
  Sun,
  History,
  Printer,
  Boxes,
  Sparkles,
  AlertTriangle,
  Download,
  List,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import { toast } from "sonner";
import { exportReportToExcel } from "@/lib/export-excel";
import { autoInjectFromDrive } from "@/lib/auto-inject";
import { sortProducts } from "@/lib/product-sorting";

interface DashboardSearchParams {
  reportId?: string;
}

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: Dashboard,
  validateSearch: (search: Record<string, unknown>): DashboardSearchParams => {
    return {
      reportId: search.reportId as string | undefined,
    };
  },
});

function pctDiff(curr: number, prev: number | undefined): number | undefined {
  if (prev === undefined || prev === null || prev === 0) return undefined;
  return ((curr - prev) / prev) * 100;
}

function Dashboard() {
  const { reportId } = Route.useSearch();
  const [autoInjected, setAutoInjected] = useState(false);

  useEffect(() => {
    autoInjectFromDrive().then((result) => {
      if (result.injected) {
        console.log("[dashboard] Drive data auto-injected:", result.reportId);
      }
      setAutoInjected(true);
    });
  }, []);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["latestReport", reportId, autoInjected],
    queryFn: () => getLatestReportFull({ data: { reportId } }),
  });
  const [dark, setDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const [printLayout, setPrintLayout] = useState<"pc" | "mobile">("pc");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  const customerProductsForSelected = useMemo(() => {
    if (!selectedCustomer || !data) return [];
    return (data.customerProducts || []).filter(
      (p: any) => p.customer_name === selectedCustomer,
    );
  }, [selectedCustomer, data]);

  if (isLoading)
    return (
      <div className="p-8 text-center" dir="rtl">
        ط¬ط§ط±ظٹ ط§ظ„طھط­ظ…ظٹظ„...
      </div>
    );

  function handleExport() {
    if (!data) {
      toast.error("ظ„ط§ طھظˆط¬ط¯ ط¨ظٹط§ظ†ط§طھ ظ„ظ„طھطµط¯ظٹط±");
      return;
    }
    try {
      exportReportToExcel(data as any);
      toast.success("طھظ… طھطµط¯ظٹط± ط§ظ„ظ…ظ„ظپ");
    } catch (e) {
      toast.error("ظپط´ظ„ ط§ظ„طھطµط¯ظٹط±");
      console.error(e);
    }
  }

  return (
    <div
      className={`min-h-screen bg-background print-layout-${printLayout}`}
      dir="rtl"
    >
      {/* Dynamic Print Orientation Tag */}
      {printLayout === "pc" ? (
        <style
          dangerouslySetInnerHTML={{
            __html:
              "@media print { @page { size: A4 landscape !important; margin: 6mm 10mm !important; } }",
          }}
        />
      ) : (
        <style
          dangerouslySetInnerHTML={{
            __html:
              "@media print { @page { size: A4 portrait !important; margin: 10mm 10mm !important; } }",
          }}
        />
      )}

      <header className="sticky top-0 z-10 border-b-4 border-primary/20 bg-card/90 backdrop-blur no-print overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute -top-10 -right-10 w-32 h-48 bg-primary rounded-xl rotate-12" />
          <div className="absolute -top-12 right-10 w-32 h-48 bg-accent rounded-xl -rotate-6" />
          <div className="absolute -top-8 right-24 w-32 h-48 bg-destructive rounded-xl rotate-[24deg]" />
        </div>
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-accent text-accent-foreground p-2 rounded-2xl shadow-accent-glow -rotate-3 border-b-4 border-accent-dark">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div className="relative">
              <h1 className="text-xl sm:text-2xl font-black text-primary-dark tracking-wide rotate-1">
                ظ„ظˆط­ط© ط§ظ„طھط­ظƒظ… ط§ظ„طھظ†ظپظٹط°ظٹط©
              </h1>
              <div className="absolute -bottom-2 -left-2 -right-2 h-2 bg-accent/20 -skew-x-12 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExport}
              className="px-3 sm:px-4 rounded-full font-bold bg-white shadow-sm border border-muted hover:border-primary/30"
              title="طھطµط¯ظٹط± Excel"
            >
              <Download className="h-4 w-4 sm:ml-2 text-info" />
              <span className="hidden sm:inline">طھطµط¯ظٹط±</span>
            </Button>
            <Link to="/history">
              <Button
                variant="ghost"
                size="sm"
                className="px-3 sm:px-4 rounded-full font-bold bg-white shadow-sm border border-muted hover:border-primary/30"
              >
                <History className="h-4 w-4 sm:ml-2 text-accent-dark" />
                <span className="hidden sm:inline">ط§ظ„ط³ط¬ظ„</span>
              </Button>
            </Link>
            <PrintDialog
              printLayout={printLayout}
              setPrintLayout={setPrintLayout}
            />
            <ResetButton onDone={() => refetch()} />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full bg-white shadow-sm border border-muted hover:border-primary/30 ml-2"
            >
              {dark ? (
                <Sun className="h-4 w-4 text-accent" />
              ) : (
                <Moon className="h-4 w-4 text-primary" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="print-only px-4 py-3 border-b" dir="rtl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">
            ظ„ظˆط­ط© ط§ظ„طھط­ظƒظ… ط§ظ„طھظ†ظپظٹط°ظٹط© â€” ط§ظ„ظ…ط¨ظٹط¹ط§طھ ظˆط§ظ„طھط­طµظٹظ„
          </h1>
          <div className="text-xs">
            طھط§ط±ظٹط® ط§ظ„ط·ط¨ط§ط¹ط©:{" "}
            {new Date().toLocaleString("ar-EG-u-nu-latn", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 print:space-y-4 print:p-0 print:m-0">
        <div className="no-print">
          <UploadDialog
            onUploaded={() => {
              refetch();
              toast.success("طھظ… ط§ظ„طھط­ط¯ظٹط«");
            }}
          />
        </div>

        {!data && (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              ظ„ط§ طھظˆط¬ط¯ طھظ‚ط§ط±ظٹط± ظ…ط³طھظˆط±ط¯ط© ط¨ط¹ط¯. ط§ط±ظپط¹ ظ…ظ„ظپط§طھظƒ ظ„ظ„ط¨ط¯ط،.
            </CardContent>
          </Card>
        )}

        {data && (
          <DashboardContent
            data={data as any}
            onCustomerSelect={setSelectedCustomer}
            onUpdateSummary={() => refetch()}
          />
        )}
      </main>

      <CustomerProductsDrawer
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
        products={customerProductsForSelected as any}
      />
    </div>
  );
}

interface DashData {
  report: {
    id: string;
    report_date: string;
    total_sales: number;
    total_collected: number;
    total_collected_from_sheet?: number;
    total_sales_from_sheet?: number;
    collection_rate: number;
    total_qty: number;
    raw_material_qty: number;
    feed_qty: number;
    customer_count: number;
    invoice_count: number;
    average_invoice: number;
    total_receivables: number;
    opening_balance: number;
    ai_summary: unknown;
  };
  customers: Array<{
    id: string;
    customer_name: string;
    sales_amount: number;
    collected_amount: number;
    prev_balance: number;
    outstanding_amount: number;
    collection_ratio: number;
    invoice_count: number;
    total_qty: number;
    risk_score: number;
    status: string;
  }>;
  products: Array<{
    id: string;
    product_name: string;
    total_qty: number;
    total_amount: number;
    category: string | null;
  }>;
  customerProducts: Array<{
    customer_name: string;
    product_name: string;
    quantity: number;
    total_amount: number;
  }>;
  comparisons: {
    yesterday: {
      total_sales: number;
      total_collected: number;
      total_qty: number;
      total_receivables: number;
      total_collected_from_sheet?: number;
      total_sales_from_sheet?: number;
    } | null;
    lastWeek: {
      total_sales: number;
      total_collected: number;
      total_qty: number;
      total_receivables: number;
      total_collected_from_sheet?: number;
      total_sales_from_sheet?: number;
    } | null;
    lastMonth: {
      total_sales: number;
      total_collected: number;
      total_qty: number;
      total_receivables: number;
      total_collected_from_sheet?: number;
      total_sales_from_sheet?: number;
    } | null;
  };
  history: Array<{
    report_date: string;
    total_sales: number;
    total_collected: number;
  }>;
  categories?: Array<{
    category: string;
    total_qty: number;
    total_amount: number;
  }>;
}

const CATEGORY_COLORS = ["#10b981", "#2563eb", "#7c3aed", "#d97706", "#dc2626"];

function DashboardContent({
  data,
  onCustomerSelect,
  onUpdateSummary,
}: {
  data: DashData;
  onCustomerSelect: (n: string) => void;
  onUpdateSummary: () => void;
}) {
  const r = data.report;
  const y = data.comparisons.yesterday;
  const w = data.comparisons.lastWeek;
  const m = data.comparisons.lastMonth;

  const getReportTotalDebt = (report: any) => {
    if (!report) return 0;
    // Prefer pre-calculated total_receivables, otherwise fallback
    return (
      report.total_receivables ??
      (report.opening_balance || 0) +
        (report.total_sales || 0) -
        (report.total_receipts_qabd ?? report.total_collected ?? 0)
    );
  };

  const totalDebt = getReportTotalDebt(r);

  // Active clients â€” customers with sales activity today (had an invoice)
  const todayCustomers = data.customers.filter((c) => c.sales_amount > 0);
  const topBySales = [...todayCustomers]
    .sort((a, b) => b.sales_amount - a.sales_amount)
    .slice(0, 10);
  const topByCollection = [...todayCustomers]
    .sort((a, b) => b.collected_amount - a.collected_amount)
    .slice(0, 10);
  const topByQty = [...todayCustomers]
    .sort((a, b) => b.total_qty - a.total_qty)
    .slice(0, 10);
  const topDebtors = [...todayCustomers]
    .filter((c) => c.outstanding_amount > 0)
    .sort((a, b) => b.outstanding_amount - a.outstanding_amount)
    .slice(0, 10);

  // Concentration
  const top3Sales = topBySales
    .slice(0, 3)
    .reduce((s, c) => s + c.sales_amount, 0);
  const concentrationPct =
    r.total_sales > 0 ? (top3Sales / r.total_sales) * 100 : 0;

  // Products
  const topProducts = [...data.products]
    .sort((a, b) => b.total_qty - a.total_qty)
    .slice(0, 10);
  const lowProducts = [...data.products]
    .filter((p) => p.total_qty > 0)
    .sort((a, b) => a.total_qty - b.total_qty)
    .slice(0, 5);
  const totalProductQty = data.products.reduce((s, p) => s + p.total_qty, 0);

  // Risky â€” filtered to today's customers
  const noCollection = todayCustomers.filter(
    (c) => c.sales_amount > 0 && c.collected_amount === 0,
  );

  const highRisk = todayCustomers.filter((c) => c.risk_score >= 70);

  // Distribution chart Data
  const categoryDistribution = useMemo(() => {
    const categories = [
      { category: "ط®ط§ظ…ط§طھ", total_qty: r.raw_material_qty || 0 },
      { category: "ط¹ظ„ظپ", total_qty: r.feed_qty || 0 },
    ].filter((c) => c.total_qty > 0);

    let total = categories.reduce((acc, curr) => acc + curr.total_qty, 0);
    if (!total) total = 1;
    return categories.map((c, index) => ({
      name: c.category,
      value: c.total_qty,
      pct: c.total_qty / total,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }));
  }, [r.raw_material_qty, r.feed_qty]);

  // Product sales chart Data
  const { productSalesData, productMaxQty } = useMemo(() => {
    let list = [...data.products]
      .filter(
        (p) =>
          p.total_qty > 0 &&
          !["طھطµظ†ظٹط¹", "ط¹ظ…ط§ظ„", "ظ†ظ‚ظ„"].includes(p.product_name.trim()),
      )
      .sort((a, b) => b.total_qty - a.total_qty)
      .map((p) => {
        let color = "#3b82f6";
        if (/ط°ط±ظ‡|ط°ط±ط©/.test(p.product_name)) color = "#2563eb";
        else if (/ظ†ط®ط§ظ„ظ‡|ظ†ط®ط§ظ„ط©|ط±ط¯ط©/.test(p.product_name)) color = "#0e7490";
        else if (/طµظˆظٹط§/.test(p.product_name)) color = "#7c3aed";
        else if (/ظƒط³ط¨/.test(p.product_name)) color = "#d97706";
        else if (/ط±ط¬ظٹط¹/.test(p.product_name)) color = "#dc2626";
        else if (/ط¯ظٹ ط¯ظٹ/.test(p.product_name)) color = "#10b981";
        else if (/ط­ظ„ط§ط¨/.test(p.product_name)) color = "#3b82f6";
        else if (/ط¨ط±ظٹظ…ظƒط³/.test(p.product_name)) color = "#a855f7";

        return {
          name: p.product_name,
          qty: p.total_qty,
          amount: p.total_amount,
          color,
        };
      });

    list = sortProducts(list, (p) => p.name);

    const productMaxQty =
      list.length > 0 ? Math.max(...list.map((p) => p.qty)) : 1;

    return {
      productSalesData: list,
      productMaxQty,
    };
  }, [data.products]);

  // History trend (last 15)
  const historyChart = [...data.history]
    .reverse()
    .slice(-15)
    .map((h) => ({
      date: h.report_date.slice(5),
      sales: h.total_sales,
      collected: h.total_collected,
    }));

  // Alerts engine
  const alerts: {
    type: "danger" | "warning" | "info";
    title: string;
    msg: string;
  }[] = [];
  if (concentrationPct > 50)
    alerts.push({
      type: "danger",
      title: "طھط±ظƒظٹط² ظ…ط¨ظٹط¹ط§طھ ظ…ط±طھظپط¹",
      msg: `ط£ط¹ظ„ظ‰ 3 ط¹ظ…ظ„ط§ط، ظٹظ…ط«ظ„ظˆظ† ${concentrationPct.toFixed(1)}% ظ…ظ† ط§ظ„ظ…ط¨ظٹط¹ط§طھ`,
    });
  if (r.collection_rate < 0.5 && r.total_sales > 0)
    alerts.push({
      type: "warning",
      title: "ظ†ط³ط¨ط© طھط­طµظٹظ„ ظ…ظ†ط®ظپط¶ط©",
      msg: `ظ†ط³ط¨ط© ط§ظ„طھط­طµظٹظ„ ط§ظ„ظٹظˆظ… ${fmtPct(r.collection_rate)}`,
    });
  const colDiff = y ? pctDiff(r.total_collected, y.total_collected) : undefined;
  if (colDiff !== undefined && colDiff < -20)
    alerts.push({
      type: "warning",
      title: "طھط±ط§ط¬ط¹ ط§ظ„طھط­طµظٹظ„",
      msg: `ط§ظ†ط®ظپط§ط¶ ${Math.abs(colDiff).toFixed(1)}% ط¹ظ† ط£ظ…ط³`,
    });
  const recDiff = y
    ? pctDiff(r.total_receivables, y.total_receivables)
    : undefined;
  if (recDiff !== undefined && recDiff > 10)
    alerts.push({
      type: "warning",
      title: "ظ†ظ…ظˆ ط§ظ„ط°ظ…ظ…",
      msg: `ط²ظٹط§ط¯ط© ط§ظ„ط°ظ…ظ… ط¨ظ€ ${recDiff.toFixed(1)}%`,
    });
  if (noCollection.length > 5)
    alerts.push({
      type: "info",
      title: "ط¹ظ…ظ„ط§ط، ط¨ط¯ظˆظ† طھط­طµظٹظ„",
      msg: `${noCollection.length} ط¹ظ…ظٹظ„ ط¨ظ…ط¨ظٹط¹ط§طھ ط¨ط¯ظˆظ† ط£ظٹ طھط­طµظٹظ„`,
    });
  if (highRisk.length > 0)
    alerts.push({
      type: "danger",
      title: "ط¹ظ…ظ„ط§ط، ط®ط·ط± ط¹ط§ظ„ظٹ",
      msg: `${highRisk.length} ط¹ظ…ظٹظ„ ط¶ظ…ظ† ط§ظ„ظ…ط®ط§ط·ط± ط§ظ„ط¹ط§ظ„ظٹط©`,
    });
  if (m && pctDiff(r.total_sales, m.total_sales)! < -15)
    alerts.push({
      type: "warning",
      title: "طھط±ط§ط¬ط¹ ط§ظ„ظ…ط¨ظٹط¹ط§طھ ط´ظ‡ط±ظٹط§ظ‹",
      msg: `ط§ظ†ط®ظپط§ط¶ ${Math.abs(pctDiff(r.total_sales, m.total_sales)!).toFixed(1)}% ط¹ظ† ط§ظ„ط´ظ‡ط± ط§ظ„ظ…ط§ط¶ظٹ`,
    });

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-bold">
          طھظ‚ط±ظٹط± ظٹظˆظ…{" "}
          {new Date(r.report_date).toLocaleDateString("ar-EG-u-nu-latn", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <OpeningBalanceEditor
          reportId={r.id}
          value={r.opening_balance || 0}
          onUpdated={onUpdateSummary}
        />
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 print:grid-cols-4 gap-3 print:gap-2">
        <KpiCard
          label="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط¨ظٹط¹ط§طھ"
          value={fmtMoney(r.total_sales)}
          tone="info"
          icon={<TrendingUp className="h-5 w-5" />}
          diff={pctDiff(r.total_sales, y?.total_sales)}
          diffLabel="ط¹ظ† ط£ظ…ط³"
        />
        <KpiCard
          label="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„طھط­طµظٹظ„"
          value={fmtMoney(r.total_collected_from_sheet ?? r.total_collected)}
          tone="success"
          icon={<Wallet className="h-5 w-5" />}
          diff={pctDiff(
            r.total_collected_from_sheet ?? r.total_collected,
            y ? (y.total_collected_from_sheet ?? y.total_collected) : undefined,
          )}
          diffLabel="ط¹ظ† ط£ظ…ط³"
        />
        <KpiCard
          label="ظ†ط³ط¨ط© ط§ظ„طھط­طµظٹظ„"
          value={fmtPct(r.collection_rate)}
          tone={
            r.collection_rate >= 0.7
              ? "success"
              : r.collection_rate >= 0.4
                ? "warning"
                : "danger"
          }
          icon={<Percent className="h-5 w-5" />}
        />
        <KpiCard
          label="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط¯ظٹظˆظ†ظٹط©"
          value={fmtMoney(totalDebt)}
          tone="danger"
          icon={<AlertCircle className="h-5 w-5" />}
          diff={y ? pctDiff(totalDebt, getReportTotalDebt(y)) : undefined}
          diffLabel="ط¹ظ† ط£ظ…ط³"
        />
        <KpiCard
          label="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظƒظ…ظٹط§طھ (ظƒظٹظ„ظˆ)"
          value={fmtNumber(r.total_qty, 2)}
          tone="default"
          icon={<Boxes className="h-5 w-5" />}
          diff={pctDiff(r.total_qty, y?.total_qty)}
          diffLabel="ط¹ظ† ط£ظ…ط³"
        />
        <KpiCard
          label="ظƒظ…ظٹط§طھ ط§ظ„ط®ط§ظ…ط§طھ"
          value={fmtNumber(r.raw_material_qty, 2)}
          tone="default"
          icon={<Package className="h-5 w-5" />}
        />
        <KpiCard
          label="ظƒظ…ظٹط§طھ ط§ظ„ط£ط¹ظ„ط§ظپ"
          value={fmtNumber(r.feed_qty, 2)}
          tone="default"
          icon={<Package className="h-5 w-5" />}
        />
        <KpiCard
          label="ط¹ط¯ط¯ ط§ظ„ط¹ظ…ظ„ط§ط،"
          value={fmtNumber(r.customer_count)}
          tone="info"
          icon={<Users className="h-5 w-5" />}
        />
        <KpiCard
          label="ط¹ط¯ط¯ ط§ظ„ظپظˆط§طھظٹط±"
          value={fmtNumber(r.invoice_count)}
          tone="info"
          icon={<FileText className="h-5 w-5" />}
        />
        <KpiCard
          label="ظ…طھظˆط³ط· ط§ظ„ظپط§طھظˆط±ط©"
          value={fmtMoney(r.average_invoice)}
          tone="default"
          icon={<Receipt className="h-5 w-5" />}
        />
      </div>

      <CustomerTable customers={data.customers} onSelect={onCustomerSelect} />

      {concentrationPct > 50 && (
        <Card className="border-r-[6px] border-destructive bg-destructive/5 rounded-[24px] shadow-coral-glow overflow-hidden">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
              <h3 className="font-bold text-destructive">
                طھظ†ط¨ظٹظ‡: طھط±ظƒظٹط² ط¹ط§ظ„ظٹ ظپظٹ ط§ظ„ظ…ط¨ظٹط¹ط§طھ
              </h3>
              <p className="text-sm">
                ط£ط¹ظ„ظ‰ 3 ط¹ظ…ظ„ط§ط، ظٹظ…ط«ظ„ظˆظ† {concentrationPct.toFixed(1)}% ظ…ظ† ط¥ط¬ظ…ط§ظ„ظٹ
                ط§ظ„ظ…ط¨ظٹط¹ط§طھ â€” ط®ط·ط± ط§ط¹طھظ…ط§ط¯ظٹط© ظ…ط±طھظپط¹.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <AiSummaryCard
        reportId={r.id}
        summary={r.ai_summary as never}
        onUpdate={onUpdateSummary}
      />

      {/* Report Charts Section */}
      <div className="grid md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2">
        {/* Donut Chart: Sales Distribution */}
        <Card className="shadow-card border-0 rounded-[24px] overflow-hidden bg-card">
          <CardHeader className="pb-4 border-b-2 border-dashed border-primary/20 mb-4">
            <CardTitle className="text-xl font-extrabold flex items-center justify-between w-full text-primary-dark">
              <span className="flex items-center gap-2">
                <span className="text-2xl">ًں“ˆ</span>
                <span>طھظˆط²ظٹط¹ ط§ظ„ظ…ط¨ظٹط¹ط§طھ (ط®ط§ظ…ط§طھ / ط£ط¹ظ„ط§ظپ) ًں“ٹ</span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent
            style={{ height: 260 }}
            className="flex flex-col justify-between"
          >
            {categoryDistribution.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                ظ„ط§ طھظˆط¬ط¯ ط¨ظٹط§ظ†ط§طھ ظƒط§ظپظٹط© ظ„ظ„طھطµظ†ظٹظپ
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-center relative">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={6}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                    >
                      {categoryDistribution.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid hsl(var(--border))",
                        backgroundColor: "hsl(var(--background))",
                      }}
                      itemStyle={{ fontWeight: "bold", fontSize: "13px" }}
                      formatter={(value: number) => [
                        `${fmtNumber(value, 2)} ظƒظٹظ„ظˆ`,
                        "ط§ظ„ظƒظ…ظٹط©",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-7">
                  <span className="text-lg font-black text-foreground tabular-nums">
                    {fmtNumber(
                      categoryDistribution.reduce(
                        (acc, curr) => acc + curr.value,
                        0,
                      ),
                      0,
                    )}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    ظƒظٹظ„ظˆ
                  </span>
                </div>
                {/* Custom Legend underneath chart */}
                <div className="flex items-center justify-center gap-6 text-sm font-bold mt-1">
                  {categoryDistribution.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-sm shrink-0"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-muted-foreground text-xs font-bold">
                        {entry.name} ({fmtNumber(entry.value, 1)} ظƒظٹظ„ظˆ)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* History Chart */}
        <Card className="shadow-card border-0 rounded-[24px] overflow-hidden bg-card">
          <CardHeader className="pb-4 border-b-2 border-dashed border-primary/20 mb-4">
            <CardTitle className="text-xl font-extrabold flex items-center justify-between w-full text-primary-dark">
              <span className="flex items-center gap-2">
                <span className="text-2xl">ًں“ˆ</span>
                <span>ط§طھط¬ط§ظ‡ ط§ظ„ظ…ط¨ظٹط¹ط§طھ ظˆط§ظ„طھط­طµظٹظ„ ًں“ˆ</span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={historyChart}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-info)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-info)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorCollected"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-success)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-success)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.15}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  reversed
                  tick={{
                    fontSize: 12,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                  tick={{
                    fontSize: 12,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--background))",
                  }}
                  itemStyle={{ fontWeight: "bold", fontSize: "13px" }}
                  formatter={(value: number) => [
                    `${value.toLocaleString()} ط¬.ظ…`,
                    undefined,
                  ]}
                  labelStyle={{
                    color: "hsl(var(--muted-foreground))",
                    marginBottom: "4px",
                    fontSize: "13px",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12, fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-info)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  name="ط§ظ„ظ…ط¨ظٹط¹ط§طھ"
                />
                <Area
                  type="monotone"
                  dataKey="collected"
                  stroke="var(--color-success)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCollected)"
                  name="ط§ظ„طھط­طµظٹظ„"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 print:grid-cols-2 gap-4">
        <TopList
          title="ط£ظƒط¨ط± 10 ط¹ظ…ظ„ط§ط، ط¨ط§ظ„ظ…ط¨ظٹط¹ط§طھ"
          items={topBySales.map((c) => ({
            name: c.customer_name,
            value: fmtMoney(c.sales_amount),
          }))}
        />
        <TopList
          title="ط£ظƒط¨ط± 10 ظ…ط­طµظ„ظٹظ†"
          items={topByCollection.map((c) => ({
            name: c.customer_name,
            value: fmtMoney(c.collected_amount),
          }))}
        />
        <TopList
          title="ط£ظƒط¨ط± 10 ط¨ط§ظ„ظƒظ…ظٹط§طھ (ظƒظٹظ„ظˆ)"
          items={topByQty.map((c) => ({
            name: c.customer_name,
            value: fmtNumber(c.total_qty, 2),
          }))}
        />
        <TopList
          title="ط£ظƒط¨ط± 10 ظ…ط¯ظٹظˆظ†ظٹظ†"
          items={topDebtors.map((c) => ({
            name: c.customer_name,
            value: fmtMoney(c.outstanding_amount),
          }))}
          tone="destructive"
        />
      </div>

      <Card className="shadow-card border-0 rounded-[24px] overflow-hidden bg-card">
        <CardHeader className="pb-4 border-b-2 border-dashed border-primary/20 mb-4">
          <CardTitle className="text-base font-extrabold flex flex-row-reverse items-center gap-2 text-foreground justify-between">
            <span className="flex items-center gap-2">
              <span>طھظپطµظٹظ„ ط§ظ„ظ…ظ†طھط¬ط§طھ (ظƒظ…ظٹط§طھ ظˆظ‚ظٹظ…)</span>
              <List className="h-5 w-5 text-emerald-500 shrink-0" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-2">
          {productSalesData.length === 0 ? (
            <div className="flex justify-center text-muted-foreground text-sm">
              ظ„ط§ طھظˆط¬ط¯ ظ…ط¨ظٹط¹ط§طھ ط£طµظ†ط§ظپ
            </div>
          ) : (
            <div className="space-y-1.5" dir="rtl">
              {productSalesData.map((p) => {
                const percentage = (p.qty / productMaxQty) * 100;
                return (
                  <div
                    key={p.name}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 py-0.5 bg-transparent hover:bg-slate-50/50 dark:hover:bg-slate-900/40 rounded transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800 pb-1.5"
                  >
                    {/* Name - Right aligned */}
                    <div className="w-full sm:w-40 text-right font-bold text-sm text-foreground truncate shrink-0">
                      {p.name}
                    </div>

                    {/* Bar - Middle */}
                    <div className="flex-1 h-6 bg-slate-100 dark:bg-slate-900 rounded overflow-hidden relative flex flex-row-reverse items-center justify-start">
                      <div
                        className="h-full rounded flex items-center justify-end px-3 font-extrabold text-[11px] sm:text-xs text-white shadow-xs transition-style duration-500 shrink-0"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: p.color,
                          minWidth: p.qty > 0 ? "80px" : "0px",
                        }}
                      >
                        <span className="tabular-nums font-black whitespace-nowrap">
                          {fmtNumber(p.qty, 1)} ظƒظٹظ„ظˆ
                        </span>
                      </div>
                    </div>

                    {/* Value - Left aligned */}
                    <div className="w-full sm:w-32 text-left font-extrabold text-sm text-foreground/80 shrink-0 flex items-center justify-end gap-1 tabular-nums">
                      <span>{fmtMoney(p.amount)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            ظ…ط­ط±ظƒ ط§ظ„طھظ†ط¨ظٹظ‡ط§طھ
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!alerts.length && (
            <p className="text-muted-foreground text-sm">
              ظ„ط§ طھظˆط¬ط¯ طھظ†ط¨ظٹظ‡ط§طھ ط­ط±ط¬ط©. ط§ظ„ط£ظ…ظˆط± طھط³ظٹط± ط¨ط´ظƒظ„ ط·ط¨ظٹط¹ظٹ.
            </p>
          )}
          <div className="grid md:grid-cols-2 gap-2 print:grid-cols-2">
            {alerts.map((a) => (
              <div
                key={a.title}
                className={`p-3 rounded-md border flex gap-2 ${
                  a.type === "danger"
                    ? "border-destructive/40 bg-destructive/5"
                    : a.type === "warning"
                      ? "border-warning/40 bg-warning/5"
                      : "border-info/40 bg-info/5"
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 shrink-0 ${a.type === "danger" ? "text-destructive" : a.type === "warning" ? "text-warning" : "text-info"}`}
                />
                <div className="text-sm">
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-muted-foreground">{a.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-extrabold">
            <History className="h-5 w-5 text-accent" />
            ظ…ظ‚ط§ط±ظ†ط© ط²ظ…ظ†ظٹط©
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-slate-100 dark:border-slate-800">
            <table className="w-full text-base border-collapse">
              <thead className="bg-muted/60">
                <tr>
                  <th className="p-3 text-right font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    ط§ظ„ظ…ط¤ط´ط±
                  </th>
                  <th className="p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    ط§ظ„ظٹظˆظ…
                  </th>
                  <th className="p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    ط£ظ…ط³
                  </th>
                  <th className="p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    ظ†ظپط³ ط§ظ„ظٹظˆظ… ط§ظ„ط£ط³ط¨ظˆط¹ ط§ظ„ظ…ط§ط¶ظٹ
                  </th>
                  <th className="p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    ط§ظ„ط´ظ‡ط± ط§ظ„ظ…ط§ط¶ظٹ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {(
                  [
                    "total_sales",
                    "total_collected",
                    "total_qty",
                    "total_receivables",
                  ] as const
                ).map((k) => {
                  const getVal = (
                    report:
                      | typeof r
                      | typeof y
                      | typeof w
                      | typeof m
                      | null
                      | undefined,
                  ) => {
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

                  const renderCell = (
                    val: number | null | undefined,
                    isToday = false,
                  ) => {
                    if (val === null || val === undefined) return "â€”";
                    const formatted =
                      k === "total_qty" ? fmtNumber(val, 2) : fmtMoney(val);
                    return (
                      <span
                        className={
                          isToday
                            ? "font-extrabold text-primary"
                            : "font-bold text-foreground/85"
                        }
                      >
                        {formatted}
                      </span>
                    );
                  };

                  return (
                    <tr
                      key={k}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
                    >
                      <td className="p-3 font-bold text-sm sm:text-base text-right text-foreground">
                        {k === "total_sales"
                          ? "ط§ظ„ظ…ط¨ظٹط¹ط§طھ"
                          : k === "total_collected"
                            ? "ط§ظ„طھط­طµظٹظ„"
                            : k === "total_qty"
                              ? "ط§ظ„ظƒظ…ظٹط§طھ ظƒط¬ظ…"
                              : "ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط¯ظٹظˆظ†ظٹط© (ط§ظ„ط°ظ…ظ…)"}
                      </td>
                      <td className="p-3 text-center text-sm sm:text-base tabular-nums">
                        {renderCell(todayVal, true)}
                      </td>
                      <td className="p-3 text-center text-sm sm:text-base tabular-nums">
                        {renderCell(yestVal)}
                      </td>
                      <td className="p-3 text-center text-sm sm:text-base tabular-nums border-x border-slate-50 dark:border-slate-800/20">
                        {renderCell(weekVal)}
                      </td>
                      <td className="p-3 text-center text-sm sm:text-base tabular-nums">
                        {renderCell(monthVal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function OpeningBalanceEditor({
  reportId,
  value,
  onUpdated,
}: {
  reportId: string;
  value: number;
  onUpdated: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(String(value || 0));
  const [saving, setSaving] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setVal(String(value || 0));
  }, [value]);

  async function save() {
    const num = parseFloat(val);
    if (isNaN(num) || num < 0) {
      toast.error("ظ‚ظٹظ…ط© ط؛ظٹط± طµط­ظٹط­ط©");
      return;
    }
    setSaving(true);
    try {
      await updateOpeningBalance({ data: { reportId, openingBalance: num } });
      toast.success("طھظ… طھط­ط¯ظٹط« ط§ظ„ظ…ط¯ظٹظˆظ†ظٹط© ط§ظ„ظ‚ط¯ظٹظ…ط©");
      if (isMounted.current) {
        setEditing(false);
        onUpdated();
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "ظپط´ظ„ ط§ظ„طھط­ط¯ظٹط«");
    } finally {
      if (isMounted.current) {
        setSaving(false);
      }
    }
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-xs sm:text-sm px-3 py-1.5 rounded-md border bg-card hover:bg-muted/50 transition flex items-center gap-2"
      >
        <span className="text-muted-foreground">ط§ظ„ظ…ط¯ظٹظˆظ†ظٹط© ط§ظ„ظ‚ط¯ظٹظ…ط©:</span>
        <span className="font-bold tabular-nums">{fmtMoney(value || 0)}</span>
        <span className="text-accent text-[10px]">(طھط¹ط¯ظٹظ„)</span>
      </button>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        step="0.01"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-40 px-2 py-1.5 text-sm border rounded-md bg-background"
        placeholder="ط§ظ„ظ…ط¯ظٹظˆظ†ظٹط© ط§ظ„ظ‚ط¯ظٹظ…ط©"
      />
      <Button size="sm" onClick={save} disabled={saving}>
        ط­ظپط¸
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setEditing(false);
          setVal(String(value || 0));
        }}
      >
        ط¥ظ„ط؛ط§ط،
      </Button>
    </div>
  );
}

function TopList({
  title,
  items,
  tone,
}: {
  title: string;
  items: { name: string; value: string }[];
  tone?: "destructive";
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-1.5 text-sm">
          {items.map((it, i) => (
            <li
              key={it.name}
              className="flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-full bg-muted text-xs flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="truncate">{it.name}</span>
              </span>
              <span
                className={`font-semibold tabular-nums ${tone === "destructive" ? "text-destructive" : ""}`}
              >
                {it.value}
              </span>
            </li>
          ))}
          {!items.length && (
            <li className="text-muted-foreground text-center py-2">
              ظ„ط§ طھظˆط¬ط¯ ط¨ظٹط§ظ†ط§طھ
            </li>
          )}
        </ol>
      </CardContent>
    </Card>
  );
}

function ResetButton({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function handleReset() {
    setLoading(true);
    try {
      await resetAllReports();
      toast.success("طھظ… طھطµظپظٹط± ط¬ظ…ظٹط¹ ط§ظ„ط³ط¬ظ„ط§طھ");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "ظپط´ظ„ ط§ظ„طھطµظپظٹط±");
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="px-2 sm:px-3 text-destructive hover:text-destructive"
          title="طھطµظپظٹط±"
        >
          <Trash2 className="h-4 w-4 sm:ml-1" />
          <span className="hidden sm:inline">طھطµظپظٹط±</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>طھطµظپظٹط± ط¬ظ…ظٹط¹ ط§ظ„ط³ط¬ظ„ط§طھطں</AlertDialogTitle>
          <AlertDialogDescription>
            ط³ظٹطھظ… ط­ط°ظپ ط¬ظ…ظٹط¹ ط§ظ„طھظ‚ط§ط±ظٹط± ط§ظ„ظٹظˆظ…ظٹط© ظˆط§ظ„ط¹ظ…ظ„ط§ط، ظˆط§ظ„ظ…ظ†طھط¬ط§طھ ظˆط§ظ„ظ…ط¯ظٹظˆظ†ظٹط© ط§ظ„ظ‚ط¯ظٹظ…ط©
            ظ†ظ‡ط§ط¦ظٹط§ظ‹. ظ‡ط°ط§ ط§ظ„ط¥ط¬ط±ط§ط، ظ„ط§ ظٹظ…ظƒظ† ط§ظ„طھط±ط§ط¬ط¹ ط¹ظ†ظ‡.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ط¥ظ„ط؛ط§ط،</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReset}
            disabled={loading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {loading ? "ط¬ط§ط±ظٹ ط§ظ„طھطµظپظٹط±..." : "ظ†ط¹ظ…طŒ طµظپظ‘ط± ط§ظ„ظƒظ„"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

