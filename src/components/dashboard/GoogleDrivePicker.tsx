import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, HardDrive, FileSpreadsheet, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { googleSignIn, getAccessToken, initAuth } from "@/lib/google-auth";
import { toast } from "sonner";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

export function GoogleDrivePicker({
  open,
  onOpenChange,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (fileId: string, accessToken: string, fileName: string) => void;
}) {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsub = initAuth(
      (_user: any, t: string) => {
        setNeedsAuth(false);
        setToken(t);
        if (open) fetchFiles(t);
      },
      () => setNeedsAuth(true)
    );
    return () => unsub();
  }, [open]);

  useEffect(() => {
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

  const fetchFiles = async (accessToken: string) => {
    setLoading(true);
    try {
      // Query for excel and sheets files
      let q = "mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' or mimeType='application/vnd.google-apps.spreadsheet' or mimeType='application/vnd.ms-excel.sheet.macroEnabled.12'";
      if (search) {
        q += ` and name contains '${search}'`;
      }
      
      const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&orderBy=modifiedTime desc&pageSize=50`, {
        headers: { Authorization: `Bearer ${accessToken}` },
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95%] rounded-xl gap-4 p-5 sm:p-6" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-blue-500" />
            <span>اختر ملف من جوجل درايف</span>
          </DialogTitle>
        </DialogHeader>

        {needsAuth ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <p className="text-muted-foreground text-center">يرجى تسجيل الدخول للوصول إلى ملفات جوجل درايف الخاصة بك.</p>
            <Button onClick={handleLogin} disabled={isLoggingIn} className="w-full">
              {isLoggingIn ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : null}
              تسجيل الدخول باستخدام جوجل
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن ملف..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9"
              />
            </div>
            
            <div className="h-64 overflow-y-auto space-y-2">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : files.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
                  لا توجد ملفات.
                </div>
              ) : (
                files.map((f) => (
                  <button
                    key={f.id}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-right"
                    onClick={() => {
                      if (token) onSelect(f.id, token, f.name);
                      onOpenChange(false);
                    }}
                  >
                    <FileSpreadsheet className="h-6 w-6 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-sm truncate flex-1">{f.name}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
