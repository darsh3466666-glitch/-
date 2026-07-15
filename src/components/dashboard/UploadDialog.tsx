import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";
import { parseAndImportReport } from "@/lib/excel-parser.functions";
import { GoogleDrivePicker } from "./GoogleDrivePicker";
import { HardDrive } from "lucide-react";

interface Props {
  onUploaded: () => void;
}

function fileToB64(f: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const result = r.result as string;
      resolve(result.split(",")[1]);
    };
    r.onerror = () => reject(r.error);
    r.readAsDataURL(f);
  });
}

export function UploadDialog({ onUploaded }: Props) {
  const [collections, setCollections] = useState<File | null>(null);
  const [invoices, setInvoices] = useState<File | null>(null);
  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [loading, setLoading] = useState(false);
  const [drivePickerOpen, setDrivePickerOpen] = useState<{ open: boolean; target: "collections" | "invoices" | null }>({ open: false, target: null });
  const [collectionsName, setCollectionsName] = useState<string | null>(null);
  const [invoicesName, setInvoicesName] = useState<string | null>(null);
  
  // Base64 stored for drive files
  const [collectionsB64, setCollectionsB64] = useState<string | null>(null);
  const [invoicesB64, setInvoicesB64] = useState<string | null>(null);

  const collectionsRef = useRef<HTMLInputElement>(null);
  const invoicesRef = useRef<HTMLInputElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function handleUpload() {
    if ((!collections && !collectionsB64) || (!invoices && !invoicesB64)) {
      toast.error(
        "يرجى رفع ملفي التحصيل والفواتير.",
      );
      return;
    }
    setLoading(true);
    try {
      const [c, i] = await Promise.all([
        collectionsB64 ? Promise.resolve(collectionsB64) : fileToB64(collections!),
        invoicesB64 ? Promise.resolve(invoicesB64) : fileToB64(invoices!),
      ]);
      const res = await parseAndImportReport({
        data: {
          collectionsB64: c,
          invoicesB64: i,
          reportDate: date || undefined,
        },
      });
      toast.success(`تم استيراد تقرير ${res.reportDate}`);
      if (isMounted.current) {
        setCollections(null);
        setInvoices(null);
        setCollectionsB64(null);
        setInvoicesB64(null);
        setCollectionsName(null);
        setInvoicesName(null);
        setDate(new Date().toISOString().slice(0, 10));
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

  const handleDriveSelect = async (fileId: string, accessToken: string, fileName: string) => {
    setLoading(true);
    try {
      // Check if it's a google sheet or excel file. Google sheet needs export, excel needs ?alt=media
      let res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=mimeType`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const metadata = await res.json();
      
      let downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
      if (metadata.mimeType === 'application/vnd.google-apps.spreadsheet') {
        downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;
      }

      const fileRes = await fetch(downloadUrl, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!fileRes.ok) throw new Error("Failed to download file from Drive");
      const blob = await fileRes.blob();
      
      // Convert blob to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const b64 = (reader.result as string).split(',')[1];
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

  return (
    <div className="flex flex-col md:flex-row items-end gap-3 p-4 rounded-lg border border-border bg-card/50">
      <GoogleDrivePicker
        open={drivePickerOpen.open}
        onOpenChange={(open) => setDrivePickerOpen((prev) => ({ ...prev, open }))}
        onSelect={handleDriveSelect}
      />
      <div className="flex-1 min-w-0 space-y-1">
        <label className="text-xs text-muted-foreground flex items-center justify-between">
          <span>ملف التحصيل (xlsm/xlsx)</span>
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => setDrivePickerOpen({ open: true, target: "collections" })}>
            <HardDrive className="h-3 w-3 ml-1" /> درايف
          </Button>
        </label>
        <div className="relative">
          <Input
            ref={collectionsRef}
            type="file"
            accept=".xlsm,.xlsx"
            onChange={(e) => {
              setCollections(e.target.files?.[0] ?? null);
              setCollectionsB64(null);
              setCollectionsName(null);
            }}
            className={collectionsB64 ? "opacity-0 absolute inset-0 w-full z-[-1]" : ""}
          />
          {collectionsB64 && (
            <div className="flex items-center justify-between border rounded-md px-3 py-2 text-sm bg-muted/50">
              <span className="truncate">{collectionsName}</span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-destructive" onClick={() => { setCollectionsB64(null); setCollectionsName(null); }}>إلغاء</Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <label className="text-xs text-muted-foreground flex items-center justify-between">
          <span>فواتير اليوم (xlsx)</span>
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => setDrivePickerOpen({ open: true, target: "invoices" })}>
            <HardDrive className="h-3 w-3 ml-1" /> درايف
          </Button>
        </label>
        <div className="relative">
          <Input
            ref={invoicesRef}
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              setInvoices(e.target.files?.[0] ?? null);
              setInvoicesB64(null);
              setInvoicesName(null);
            }}
            className={invoicesB64 ? "opacity-0 absolute inset-0 w-full z-[-1]" : ""}
          />
          {invoicesB64 && (
            <div className="flex items-center justify-between border rounded-md px-3 py-2 text-sm bg-muted/50">
              <span className="truncate">{invoicesName}</span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-destructive" onClick={() => { setInvoicesB64(null); setInvoicesName(null); }}>إلغاء</Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-44 space-y-1">
        <label className="text-xs text-muted-foreground">
          تاريخ التقرير (اختياري)
        </label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <Button
        onClick={handleUpload}
        disabled={loading}
        className="w-full md:w-auto bg-gradient-to-r from-accent to-accent-foreground text-primary-dark shadow-accent-glow hover:scale-[0.98] transition-transform text-base"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin ml-2" />
        ) : (
          <Upload className="h-4 w-4 ml-2" />
        )}
        استيراد
      </Button>
    </div>
  );
}
