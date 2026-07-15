import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Printer,
  Monitor,
  Smartphone,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

interface PrintDialogProps {
  printLayout: "pc" | "mobile";
  setPrintLayout: (layout: "pc" | "mobile") => void;
  trigger?: React.ReactNode;
}

export function PrintDialog({
  printLayout,
  setPrintLayout,
  trigger,
}: PrintDialogProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<"pc" | "mobile">(printLayout);
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  function handleStartPrint() {
    setPrintLayout(selected);
    setOpen(false);

    // Give a clear, longer delay for full Dialog unmounting/fading and focus release to finish, resolving focus trap blocks on print.
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
          "فشلت عملية الطباعة. يرجى تجربة فتح التطبيق في نافذة مستقلة.",
        );
      }
    }, 550);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="px-2 sm:px-3">
            <Printer className="h-4 w-4 sm:ml-1 shrink-0 text-emerald-500" />
            <span className="hidden sm:inline">طباعة التقرير</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="max-w-md w-[95%] rounded-xl gap-4 p-5 sm:p-6"
        dir="rtl"
      >
        <DialogHeader className="text-right">
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <Printer className="h-5 w-5 text-emerald-500" />
            <span>إعداد وتنسيق طباعة التقرير</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            اختر التنسيق والنموذج المناسب لطباعة هذا التقرير أو حفظه كـ PDF.
          </DialogDescription>
        </DialogHeader>

        {/* Iframe Warning */}
        {isIframe && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-3 sm:p-4 rounded-xl text-amber-800 dark:text-amber-300 text-xs sm:text-sm leading-relaxed space-y-2">
            <div className="flex items-start gap-2 font-bold">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>تنبيه هام ومساعد للطباعة:</span>
            </div>
            <p className="font-semibold text-right">
              بسبب قيود المتصفح الأمنية داخل نافذة المعاينة، **لن يتم عرض نافذة
              الطباعة مباشرة**.
            </p>
            <p>
              يرجى الضغط على الزر أدناه لفتح التطبيق في نافذة مستقلة لتفعيل
              خيارات الطباعة والحفظ كملف PDF بنجاح وبأعلى جودة:
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center gap-2 border-amber-300 bg-amber-100 hover:bg-amber-200 text-amber-950 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200 font-bold rounded-xl py-2 mt-2 cursor-pointer no-print"
              onClick={() => window.open(window.location.href, "_blank")}
            >
              <ExternalLink className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>افتح في نافذة مستقلة وجديدة ↗</span>
            </Button>
          </div>
        )}

        {/* Layout Selection */}
        <div className="space-y-3 my-2">
          <h3 className="text-xs sm:text-sm font-bold text-foreground">
            شكل وتصميم الطباعة:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* PC Layout Option */}
            <button
              type="button"
              onClick={() => setSelected("pc")}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-xl text-center transition-all gap-2 bg-card cursor-pointer ${
                selected === "pc"
                  ? "border-emerald-500 ring-2 ring-emerald-500/10"
                  : "border-muted hover:border-muted-foreground/30"
              }`}
            >
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 text-blue-500 dark:text-blue-400 rounded-lg">
                <Monitor className="h-6 w-6" />
              </div>
              <span className="text-xs sm:text-sm font-bold block text-foreground">
                تنسيق شاشات الكمبيوتر
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground block max-w-[150px] leading-tight">
                (عرضي ممتد - A4 Landscape)
                <br />
                تنظيم البيانات عريضاً في صفوف كالبينتو جارد.
              </span>
            </button>

            {/* Mobile Layout Option */}
            <button
              type="button"
              onClick={() => setSelected("mobile")}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-xl text-center transition-all gap-2 bg-card cursor-pointer ${
                selected === "mobile"
                  ? "border-emerald-500 ring-2 ring-emerald-500/10"
                  : "border-muted hover:border-muted-foreground/30"
              }`}
            >
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-400 rounded-lg">
                <Smartphone className="h-6 w-6" />
              </div>
              <span className="text-xs sm:text-sm font-bold block text-foreground">
                تنسيق المحمول والـ PDF الطولي
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground block max-w-[150px] leading-tight">
                (طولي مرتب - A4 Portrait)
                <br />
                يبسط العناصر بشكل عمودي لتكون واضحة ومقروءة جداً على الهاتف.
              </span>
            </button>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row-reverse gap-2 mt-2">
          <Button
            type="button"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all gap-1.5"
            onClick={handleStartPrint}
          >
            <Printer className="h-4 w-4 shrink-0" />
            <span>عرض خيارات وبدء الطباعة</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto rounded-xl font-bold"
            onClick={() => setOpen(false)}
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
