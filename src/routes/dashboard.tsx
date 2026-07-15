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
  const [autoReady, setAutoReady] = useState(false);

  useEffect(() => {
    autoInjectFromDrive().finally(() => setAutoReady(true));
  }, []);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["latestReport", reportId, autoReady],
    queryFn: () => getLatestReportFull({ data: { reportId } }),
    enabled: autoReady,
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
        جاري التحميل...
      </div>
    );

  function handleExport() {
    if (!data) {
      toast.error("لا توجد بيانات للتصدير");
      return;
    }
    try {
      exportReportToExcel(data as any);
      toast.success("تم تصدير الملف");
    } catch (e) {
      toast.error("فشل التصدير");
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
                لوحة التحكم التنفيذية
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
              title="تصدير Excel"
            >
              <Download className="h-4 w-4 sm:ml-2 text-info" />
              <span className="hidden sm:inline">تصدير</span>
            </Button>
            <Link to="/history">
              <Button
                variant="ghost"
                size="sm"
                className="px-3 sm:px-4 rounded-full font-bold bg-white shadow-sm border border-muted hover:border-primary/30"
              >
                <History className="h-4 w-4 sm:ml-2 text-accent-dark" />
                <span className="hidden sm:inline">السجل</span>
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
            لوحة التحكم التنفيذية — المبيعات والتحصيل
          </h1>
          <div className="text-xs">
            تاريخ الطباعة:{" "}
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
              toast.success("تم التحديث");
            }}
          />
        </div>

        {!data && (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              لا توجد تقارير مستوردة بعد. ارفع ملفاتك للبدء.
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

  // Active clients — customers with sales activity today (had an invoice)
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

  // Risky — filtered to today's customers
  const noCollection = todayCustomers.filter(
    (c) => c.sales_amount > 0 && c.collected_amount === 0,
  );

  const highRisk = todayCustomers.filter((c) => c.risk_score >= 70);

  // Distribution chart Data
  const categoryDistribution = useMemo(() => {
    const categories = [
      { category: "خامات", total_qty: r.raw_material_qty || 0 },
      { category: "علف", total_qty: r.feed_qty || 0 },
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
          !["تصنيع", "عمال", "نقل"].includes(p.product_name.trim()),
      )
      .sort((a, b) => b.total_qty - a.total_qty)
      .map((p) => {
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
      title: "تركيز مبيعات مرتفع",
      msg: `أعلى 3 عملاء يمثلون ${concentrationPct.toFixed(1)}% من المبيعات`,
    });
  if (r.collection_rate < 0.5 && r.total_sales > 0)
    alerts.push({
      type: "warning",
      title: "نسبة تحصيل منخفضة",
      msg: `نسبة التحصيل اليوم ${fmtPct(r.collection_rate)}`,
    });
  const colDiff = y ? pctDiff(r.total_collected, y.total_collected) : undefined;
  if (colDiff !== undefined && colDiff < -20)
    alerts.push({
      type: "warning",
      title: "تراجع التحصيل",
      msg: `انخفاض ${Math.abs(colDiff).toFixed(1)}% عن أمس`,
    });
  const recDiff = y
    ? pctDiff(r.total_receivables, y.total_receivables)
    : undefined;
  if (recDiff !== undefined && recDiff > 10)
    alerts.push({
      type: "warning",
      title: "نمو الذمم",
      msg: `زيادة الذمم بـ ${recDiff.toFixed(1)}%`,
    });
  if (noCollection.length > 5)
    alerts.push({
      type: "info",
      title: "عملاء بدون تحصيل",
      msg: `${noCollection.length} عميل بمبيعات بدون أي تحصيل`,
    });
  if (highRisk.length > 0)
    alerts.push({
      type: "danger",
      title: "عملاء خطر عالي",
      msg: `${highRisk.length} عميل ضمن المخاطر العالية`,
    });
  if (m && pctDiff(r.total_sales, m.total_sales)! < -15)
    alerts.push({
      type: "warning",
      title: "تراجع المبيعات شهرياً",
      msg: `انخفاض ${Math.abs(pctDiff(r.total_sales, m.total_sales)!).toFixed(1)}% عن الشهر الماضي`,
    });

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-bold">
          تقرير يوم{" "}
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
          label="إجمالي المبيعات"
          value={fmtMoney(r.total_sales)}
          tone="info"
          icon={<TrendingUp className="h-5 w-5" />}
          diff={pctDiff(r.total_sales, y?.total_sales)}
          diffLabel="عن أمس"
        />
        <KpiCard
          label="إجمالي التحصيل"
          value={fmtMoney(r.total_collected_from_sheet ?? r.total_collected)}
          tone="success"
          icon={<Wallet className="h-5 w-5" />}
          diff={pctDiff(
            r.total_collected_from_sheet ?? r.total_collected,
            y ? (y.total_collected_from_sheet ?? y.total_collected) : undefined,
          )}
          diffLabel="عن أمس"
        />
        <KpiCard
          label="نسبة التحصيل"
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
          label="إجمالي المديونية"
          value={fmtMoney(totalDebt)}
          tone="danger"
          icon={<AlertCircle className="h-5 w-5" />}
          diff={y ? pctDiff(totalDebt, getReportTotalDebt(y)) : undefined}
          diffLabel="عن أمس"
        />
        <KpiCard
          label="إجمالي الكميات (كيلو)"
          value={fmtNumber(r.total_qty, 2)}
          tone="default"
          icon={<Boxes className="h-5 w-5" />}
          diff={pctDiff(r.total_qty, y?.total_qty)}
          diffLabel="عن أمس"
        />
        <KpiCard
          label="كميات الخامات"
          value={fmtNumber(r.raw_material_qty, 2)}
          tone="default"
          icon={<Package className="h-5 w-5" />}
        />
        <KpiCard
          label="كميات الأعلاف"
          value={fmtNumber(r.feed_qty, 2)}
          tone="default"
          icon={<Package className="h-5 w-5" />}
        />
        <KpiCard
          label="عدد العملاء"
          value={fmtNumber(r.customer_count)}
          tone="info"
          icon={<Users className="h-5 w-5" />}
        />
        <KpiCard
          label="عدد الفواتير"
          value={fmtNumber(r.invoice_count)}
          tone="info"
          icon={<FileText className="h-5 w-5" />}
        />
        <KpiCard
          label="متوسط الفاتورة"
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
                تنبيه: تركيز عالي في المبيعات
              </h3>
              <p className="text-sm">
                أعلى 3 عملاء يمثلون {concentrationPct.toFixed(1)}% من إجمالي
                المبيعات — خطر اعتمادية مرتفع.
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
                <span className="text-2xl">📈</span>
                <span>توزيع المبيعات (خامات / أعلاف) 📊</span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent
            style={{ height: 260 }}
            className="flex flex-col justify-between"
          >
            {categoryDistribution.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                لا توجد بيانات كافية للتصنيف
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
                        `${fmtNumber(value, 2)} كيلو`,
                        "الكمية",
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
                    كيلو
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
                        {entry.name} ({fmtNumber(entry.value, 1)} كيلو)
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
                <span className="text-2xl">📈</span>
                <span>اتجاه المبيعات والتحصيل 📈</span>
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
                    `${value.toLocaleString()} ج.م`,
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
                  name="المبيعات"
                />
                <Area
                  type="monotone"
                  dataKey="collected"
                  stroke="var(--color-success)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCollected)"
                  name="التحصيل"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 print:grid-cols-2 gap-4">
        <TopList
          title="أكبر 10 عملاء بالمبيعات"
          items={topBySales.map((c) => ({
            name: c.customer_name,
            value: fmtMoney(c.sales_amount),
          }))}
        />
        <TopList
          title="أكبر 10 محصلين"
          items={topByCollection.map((c) => ({
            name: c.customer_name,
            value: fmtMoney(c.collected_amount),
          }))}
        />
        <TopList
          title="أكبر 10 بالكميات (كيلو)"
          items={topByQty.map((c) => ({
            name: c.customer_name,
            value: fmtNumber(c.total_qty, 2),
          }))}
        />
        <TopList
          title="أكبر 10 مديونين"
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
              <span>تفصيل المنتجات (كميات وقيم)</span>
              <List className="h-5 w-5 text-emerald-500 shrink-0" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-2">
          {productSalesData.length === 0 ? (
            <div className="flex justify-center text-muted-foreground text-sm">
              لا توجد مبيعات أصناف
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
                          {fmtNumber(p.qty, 1)} كيلو
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
            محرك التنبيهات
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!alerts.length && (
            <p className="text-muted-foreground text-sm">
              لا توجد تنبيهات حرجة. الأمور تسير بشكل طبيعي.
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
            مقارنة زمنية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-slate-100 dark:border-slate-800">
            <table className="w-full text-base border-collapse">
              <thead className="bg-muted/60">
                <tr>
                  <th className="p-3 text-right font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    المؤشر
                  </th>
                  <th className="p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    اليوم
                  </th>
                  <th className="p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    أمس
                  </th>
                  <th className="p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    نفس اليوم الأسبوع الماضي
                  </th>
                  <th className="p-3 text-center font-extrabold text-sm sm:text-base text-foreground border-b border-slate-100 dark:border-slate-800">
                    الشهر الماضي
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
                    if (val === null || val === undefined) return "—";
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
                          ? "المبيعات"
                          : k === "total_collected"
                            ? "التحصيل"
                            : k === "total_qty"
                              ? "الكميات كجم"
                              : "إجمالي المديونية (الذمم)"}
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
      toast.error("قيمة غير صحيحة");
      return;
    }
    setSaving(true);
    try {
      await updateOpeningBalance({ data: { reportId, openingBalance: num } });
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
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-xs sm:text-sm px-3 py-1.5 rounded-md border bg-card hover:bg-muted/50 transition flex items-center gap-2"
      >
        <span className="text-muted-foreground">المديونية القديمة:</span>
        <span className="font-bold tabular-nums">{fmtMoney(value || 0)}</span>
        <span className="text-accent text-[10px]">(تعديل)</span>
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
        placeholder="المديونية القديمة"
      />
      <Button size="sm" onClick={save} disabled={saving}>
        حفظ
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setEditing(false);
          setVal(String(value || 0));
        }}
      >
        إلغاء
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
              لا توجد بيانات
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
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="px-2 sm:px-3 text-destructive hover:text-destructive"
          title="تصفير"
        >
          <Trash2 className="h-4 w-4 sm:ml-1" />
          <span className="hidden sm:inline">تصفير</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>تصفير جميع السجلات؟</AlertDialogTitle>
          <AlertDialogDescription>
            سيتم حذف جميع التقارير اليومية والعملاء والمنتجات والمديونية القديمة
            نهائياً. هذا الإجراء لا يمكن التراجع عنه.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReset}
            disabled={loading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {loading ? "جاري التصفير..." : "نعم، صفّر الكل"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

