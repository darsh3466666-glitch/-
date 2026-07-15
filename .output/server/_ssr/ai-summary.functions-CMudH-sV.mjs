import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-SdRzJ3tI.mjs";
import { G as GoogleGenAI } from "../_libs/google__genai.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, a as anyType, n as numberType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/p-retry.mjs";
import "../_libs/retry.mjs";
import "../_libs/google-auth-library.mjs";
import "child_process";
import "querystring";
import "fs";
import "../_libs/gaxios.mjs";
import "https";
import "../_libs/extend.mjs";
import "../_libs/gcp-metadata.mjs";
import "os";
import "../_libs/json-bigint.mjs";
import "../_libs/bignumber.js.mjs";
import "../_libs/google-logging-utils.mjs";
import "events";
import "process";
import "path";
import "../_libs/base64-js.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jws.mjs";
import "../_libs/jwa.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "fs/promises";
import "../_libs/ws.mjs";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const generateAiSummary_createServerFn_handler = createServerRpc({
  id: "11d0f3e1b3fba4848212f85fb0c2d9530a93b4aa78618c1dc5f1c6843cbb252d",
  name: "generateAiSummary",
  filename: "src/lib/ai-summary.functions.ts"
}, (opts) => generateAiSummary.__executeServer(opts));
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
}).parse(d)).handler(generateAiSummary_createServerFn_handler, async ({
  data
}) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("يرجى إعداد مفتاح GEMINI_API_KEY في الإعدادات (Settings > Secrets)");
  }
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
  const report = data.stats;
  const yesterday = data.yesterday;
  const lastWeek = data.lastWeek;
  const lastMonth = data.lastMonth;
  const customers = data.customers || [];
  const prompt = `أنت محلل مالي تنفيذي خبير في شركة تصنيع وتوزيع الأعلاف. قم بتحليل البيانات التالية وقدم تقريراً تنفيذياً موجزاً باللغة العربية.

بيانات اليوم (${report.report_date}):
- إجمالي المبيعات: ${report.total_sales.toLocaleString()} ج.م
- إجمالي التحصيل: ${report.total_collected.toLocaleString()} ج.م
- نسبة التحصيل: ${(report.collection_rate * 100).toFixed(1)}%
- إجمالي الذمم: ${report.total_receivables.toLocaleString()} ج.م
- إجمالي الكميات: ${report.total_qty} كيلو (علف: ${report.feed_qty}، خامات: ${report.raw_material_qty})
- عدد العملاء: ${report.customer_count}
- عدد الفواتير: ${report.invoice_count}
- متوسط الفاتورة: ${report.average_invoice.toLocaleString()} ج.م

${yesterday ? `أمس: مبيعات ${yesterday.total_sales.toLocaleString()}، تحصيل ${yesterday.total_collected.toLocaleString()}` : ""}
${lastWeek ? `نفس اليوم الأسبوع الماضي: مبيعات ${lastWeek.total_sales.toLocaleString()}، تحصيل ${lastWeek.total_collected.toLocaleString()}` : ""}
${lastMonth ? `الشهر الماضي: مبيعات ${lastMonth.total_sales.toLocaleString()}، تحصيل ${lastMonth.total_collected.toLocaleString()}` : ""}

أكبر 10 عملاء بالمبيعات:
${customers.slice(0, 10).map((c) => `- ${c.customer_name}: مبيعات ${c.sales_amount.toLocaleString()}، تحصيل ${c.collected_amount.toLocaleString()}، نسبة ${(c.collection_ratio * 100).toFixed(0)}%`).join("\n")}

أعد الإجابة بصيغة JSON صالحة فقط بدون أي نص آخر بهذا الشكل:
{
  "executiveSummary": "ملخص تنفيذي في 2-3 جمل",
  "risks": ["مخاطرة 1", "مخاطرة 2"],
  "opportunities": ["فرصة 1", "فرصة 2"],
  "recommendations": ["توصية 1", "توصية 2", "توصية 3"],
  "collectionInsights": "تحليل التحصيل في جملتين",
  "salesInsights": "تحليل المبيعات في جملتين"
}`;
  const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.5-pro"];
  let lastError = null;
  let text = "";
  for (const modelName of modelsToTry) {
    try {
      console.log(`Attempting to generate summary using model: ${modelName}`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt
      });
      if (response.text) {
        text = response.text;
        console.log(`Successfully generated summary using model: ${modelName}`);
        break;
      }
    } catch (err) {
      lastError = err;
      console.warn(`Model ${modelName} failed or returned error:`, err.message || err);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  if (!text) {
    const errMsg = lastError?.message || JSON.stringify(lastError) || "جميع محاولات الاتصال بالنموذج فشلت بسبب ضغط الخدمة.";
    throw new Error(`تعذر توليد التحليل حالياً بسبب ضغط عالي على مخدمات جوجل: ${errMsg}`);
  }
  let parsed;
  try {
    const match = text.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(match ? match[0] : text);
  } catch {
    parsed = {
      executiveSummary: text,
      risks: [],
      opportunities: [],
      recommendations: [],
      collectionInsights: "",
      salesInsights: ""
    };
  }
  return parsed;
});
export {
  generateAiSummary_createServerFn_handler
};
