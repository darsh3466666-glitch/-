import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface KpiProps {
  label: string;
  value: string;
  sub?: string;
  diff?: number; // percent vs comparator
  diffLabel?: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
}

export function KpiCard({
  label,
  value,
  sub,
  diff,
  diffLabel,
  tone = "default",
  icon,
}: KpiProps) {
  const toneClass =
    tone === "success"
      ? "border-r-success"
      : tone === "warning"
        ? "border-r-warning"
        : tone === "danger"
          ? "border-r-destructive shadow-coral-glow"
          : tone === "info"
            ? "border-r-info shadow-sky-glow"
            : "border-r-accent shadow-accent-glow";

  const arrow =
    diff === undefined ? null : diff > 0.5 ? (
      <ArrowUp className="h-3 w-3" />
    ) : diff < -0.5 ? (
      <ArrowDown className="h-3 w-3" />
    ) : (
      <Minus className="h-3 w-3" />
    );

  const diffColor =
    diff === undefined
      ? ""
      : diff > 0
        ? "text-success"
        : diff < 0
          ? "text-destructive"
          : "text-muted-foreground";

  return (
    <Card
      className={`border-r-[6px] border-t-0 border-b-0 border-l-0 ${toneClass} rounded-[24px] shadow-card transition-shadow hover:scale-[1.02] duration-200 cursor-pointer overflow-hidden relative bg-card`}
    >
      <CardContent className="p-4 relative z-10">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-muted-foreground truncate">
              {label}
            </p>
            <p className="text-2xl font-extrabold mt-1 tracking-wider text-foreground">
              {value}
            </p>
            {sub && (
              <p className="text-xs text-muted-foreground/80 font-medium mt-1">
                {sub}
              </p>
            )}
          </div>
          {icon && (
            <div className="text-accent shrink-0 text-3xl opacity-80">
              {icon}
            </div>
          )}
        </div>
        {diff !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-bold mt-3 ${diffColor}`}
          >
            {" "}
            {arrow} <span>{Math.abs(diff).toFixed(1)}%</span>{" "}
            <span className="text-muted-foreground/70 font-medium">
              {diffLabel}
            </span>{" "}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
