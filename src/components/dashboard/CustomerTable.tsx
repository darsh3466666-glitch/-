import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ArrowUpDown } from "lucide-react";
import { fmtMoney, fmtNumber, fmtPct } from "@/lib/formatters";
import { Button } from "@/components/ui/button";

export interface CustomerRow {
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
}

type SortKey =
  | "sales_amount"
  | "collected_amount"
  | "prev_balance"
  | "outstanding_amount"
  | "collection_ratio"
  | "risk_score"
  | "total_qty"
  | "invoice_count";

export function CustomerTable({
  customers,
  onSelect,
}: {
  customers: CustomerRow[];
  onSelect: (name: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "high_risk" | "medium_risk" | "no_collection"
  >("all");
  const [sortKey, setSortKey] = useState<SortKey>("sales_amount");
  const [asc, setAsc] = useState(false);

  const rows = useMemo(() => {
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

  function toggleSort(k: SortKey) {
    if (k === sortKey) setAsc(!asc);
    else {
      setSortKey(k);
      setAsc(false);
    }
  }

  function riskBadge(score: number) {
    if (score >= 70) {
      return (
        <span className="inline-block bg-destructive text-destructive-foreground shadow-coral-glow rounded-full px-3 py-1 text-xs font-bold animate-pulse">
          عالي
        </span>
      );
    }
    if (score >= 40) {
      return (
        <span className="inline-block bg-warning text-warning-foreground shadow-accent-glow rounded-full px-3 py-1 text-xs font-bold">
          متوسط
        </span>
      );
    }
    return (
      <span className="inline-block bg-success text-success-foreground rounded-full px-3 py-1 text-xs font-bold">
        منخفض
      </span>
    );
  }

  return (
    <Card className="shadow-card border-0 rounded-[24px] bg-card">
      <CardHeader className="gap-4 border-b-2 border-dashed border-primary/20 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          <CardTitle className="text-xl sm:text-2xl font-extrabold tracking-wide text-primary-dark">
            مبيعات العملاء ({rows.length})
          </CardTitle>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full sm:w-48 pr-8 rounded-full bg-input border-primary/20 text-primary-dark font-medium"
              placeholder="بحث..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {(
              ["all", "high_risk", "medium_risk", "no_collection"] as const
            ).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className="rounded-full font-bold"
              >
                {f === "all"
                  ? "الكل"
                  : f === "high_risk"
                    ? "خطر عالي"
                    : f === "medium_risk"
                      ? "خطر متوسط"
                      : "بدون تحصيل"}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        {/* Mobile View */}
        <div
          className="md:hidden space-y-3 p-4 bg-slate-50/50 dark:bg-slate-900/20"
          dir="rtl"
        >
          {rows.map((c, idx) => {
            const riskBorder =
              c.risk_score >= 70
                ? "border-r-destructive"
                : c.risk_score >= 40
                  ? "border-r-warning"
                  : "border-r-success";

            return (
              <div
                key={c.id || c.customer_name}
                className={
                  "bg-card border border-border shadow-sm rounded-xl p-4 flex flex-col gap-3 border-r-4 " +
                  riskBorder
                }
                onClick={() => onSelect(c.customer_name)}
              >
                <div className="flex justify-between items-start">
                  <div className="font-extrabold text-foreground text-base">
                    {c.customer_name}
                  </div>
                  <div>{riskBadge(c.risk_score)}</div>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs font-semibold mb-1">
                      المبيعات
                    </div>
                    <div className="font-bold text-info dark:text-blue-400 tabular-nums">
                      {fmtMoney(c.sales_amount)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs font-semibold mb-1">
                      المحصل
                    </div>
                    <div className="font-bold text-success dark:text-emerald-400 tabular-nums">
                      {fmtMoney(c.collected_amount)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs font-semibold mb-1">
                      الرصيد السابق
                    </div>
                    <div className="font-bold text-muted-foreground tabular-nums">
                      {fmtMoney(c.prev_balance)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs font-semibold mb-1">
                      الرصيد الحالي
                    </div>
                    <div
                      className={
                        "font-bold tabular-nums " +
                        (c.outstanding_amount > 0
                          ? "text-destructive dark:text-rose-450"
                          : c.outstanding_amount < 0
                            ? "text-success dark:text-emerald-400"
                            : "text-foreground")
                      }
                    >
                      {fmtMoney(c.outstanding_amount)}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    الفواتير:{" "}
                    <span className="font-bold text-foreground">
                      {c.invoice_count}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs tabular-nums text-foreground">
                      {fmtPct(c.collection_ratio)}
                    </span>
                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
                      <div
                        className={
                          "h-full rounded-full " +
                          (c.collection_ratio >= 0.9
                            ? "bg-success"
                            : c.collection_ratio >= 0.35
                              ? "bg-warning"
                              : "bg-slate-200 dark:bg-slate-700")
                        }
                        style={{
                          width:
                            Math.min(
                              100,
                              Math.max(0, c.collection_ratio * 100),
                            ) + "%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {!rows.length && (
            <div className="text-center text-muted-foreground py-8 font-semibold">
              لا توجد بيانات
            </div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-auto" dir="rtl">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="text-right w-12 font-bold text-foreground hidden md:table-cell">
                  #
                </TableHead>
                <TableHead className="text-right font-bold text-foreground">
                  العميل
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("sales_amount")}
                  className="cursor-pointer text-right font-bold text-foreground"
                >
                  المبيعات <ArrowUpDown className="inline h-3 w-3" />
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("collected_amount")}
                  className="cursor-pointer text-right font-bold text-foreground"
                >
                  المحصل
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("prev_balance")}
                  className="cursor-pointer text-right font-bold text-foreground hidden lg:table-cell"
                >
                  الرصيد السابق
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("outstanding_amount")}
                  className="cursor-pointer text-right font-bold text-foreground"
                >
                  الرصيد الحالي
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("total_qty")}
                  className="cursor-pointer text-right font-bold text-foreground hidden md:table-cell"
                >
                  الكمية
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("collection_ratio")}
                  className="cursor-pointer text-right font-bold text-foreground hidden lg:table-cell"
                >
                  نسبة التحصيل
                </TableHead>
                <TableHead className="text-right font-bold text-foreground hidden lg:table-cell">
                  الفواتير
                </TableHead>
                <TableHead className="text-right font-bold text-foreground hidden sm:table-cell">
                  المخاطرة
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c, idx) => {
                const rowBorderClass =
                  c.risk_score >= 70
                    ? "border-r-[6px] border-r-destructive"
                    : c.risk_score >= 40
                      ? "border-r-[6px] border-r-warning"
                      : "border-r-[6px] border-r-success";

                return (
                  <TableRow
                    key={c.id || c.customer_name}
                    className={
                      "cursor-pointer hover:bg-secondary transition-colors " +
                      rowBorderClass
                    }
                    onClick={() => onSelect(c.customer_name)}
                  >
                    <TableCell className="text-right text-muted-foreground tabular-nums font-semibold hidden md:table-cell">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="font-bold text-right text-foreground">
                      {c.customer_name}
                    </TableCell>
                    <TableCell className="text-right text-info dark:text-blue-400 font-bold tabular-nums">
                      {fmtMoney(c.sales_amount)}
                    </TableCell>
                    <TableCell className="text-success dark:text-emerald-400 text-right font-bold tabular-nums">
                      {fmtMoney(c.collected_amount)}
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums text-muted-foreground hidden lg:table-cell">
                      {fmtMoney(c.prev_balance)}
                    </TableCell>
                    <TableCell
                      className={
                        "text-right font-bold tabular-nums " +
                        (c.outstanding_amount > 0
                          ? "text-destructive dark:text-rose-450"
                          : c.outstanding_amount < 0
                            ? "text-success dark:text-emerald-400"
                            : "text-foreground")
                      }
                    >
                      {fmtMoney(c.outstanding_amount)}
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums text-foreground hidden md:table-cell">
                      {fmtNumber(c.total_qty, 2)}
                    </TableCell>
                    <TableCell className="text-right hidden lg:table-cell">
                      <div className="flex items-center gap-2 min-w-[110px]">
                        <span className="w-9 font-semibold text-xs text-right tabular-nums text-foreground">
                          {fmtPct(c.collection_ratio)}
                        </span>
                        <div className="w-14 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
                          <div
                            className={
                              "h-full rounded-full " +
                              (c.collection_ratio >= 0.9
                                ? "bg-success"
                                : c.collection_ratio >= 0.35
                                  ? "bg-warning"
                                  : "bg-slate-200 dark:bg-slate-700")
                            }
                            style={{
                              width:
                                Math.min(
                                  100,
                                  Math.max(0, c.collection_ratio * 100),
                                ) + "%",
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-foreground hidden lg:table-cell">
                      {c.invoice_count}
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">
                      {riskBadge(c.risk_score)}
                    </TableCell>
                  </TableRow>
                );
              })}
              {!rows.length && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center text-muted-foreground py-8 font-semibold"
                  >
                    لا توجد بيانات
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
