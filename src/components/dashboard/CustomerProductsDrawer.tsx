import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fmtMoney, fmtNumber } from "@/lib/formatters";
import { sortProducts } from "@/lib/product-sorting";

interface Item {
  product_name: string;
  quantity: number;
  total_amount: number;
}

export function CustomerProductsDrawer({
  open,
  onClose,
  customer,
  products,
}: {
  open: boolean;
  onClose: () => void;
  customer: string | null;
  products: Item[];
}) {
  const total = products.reduce((s, p) => s + p.quantity, 0);
  const sortedProducts = sortProducts(products, (p) => p.product_name);
  const totalAmt = products.reduce((s, p) => s + p.total_amount, 0);
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-lg overflow-y-auto"
        dir="rtl"
      >
        <SheetHeader>
          <SheetTitle>منتجات العميل: {customer}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md border p-3">
            <p className="text-muted-foreground text-xs">إجمالي الكمية</p>
            <p className="font-bold text-lg">{fmtNumber(total, 2)}</p>
          </div>
          <div className="rounded-md border p-3">
            <p className="text-muted-foreground text-xs">إجمالي القيمة</p>
            <p className="font-bold text-lg">{fmtMoney(totalAmt)}</p>
          </div>
        </div>
        <div className="mt-4 rounded-md border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الصنف</TableHead>
                <TableHead>الكمية</TableHead>
                <TableHead>القيمة</TableHead>
                <TableHead>%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{p.product_name}</TableCell>
                  <TableCell>{fmtNumber(p.quantity, 2)}</TableCell>
                  <TableCell>{fmtMoney(p.total_amount)}</TableCell>
                  <TableCell>
                    {total > 0 ? ((p.quantity / total) * 100).toFixed(1) : 0}%
                  </TableCell>
                </TableRow>
              ))}
              {!products.length && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-muted-foreground"
                  >
                    لا توجد بيانات
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
}
