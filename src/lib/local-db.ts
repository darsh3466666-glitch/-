import { get, set, del, keys } from "idb-keyval";

export async function getLocalReports() {
  const reportsKeys = await keys();
  const reports = [];
  for (const k of reportsKeys) {
    if (typeof k === "string" && k.startsWith("report_")) {
      reports.push(await get(k));
    }
  }
  reports.sort(
    (a, b) =>
      new Date(b.report.report_date).getTime() -
      new Date(a.report.report_date).getTime(),
  );
  return reports;
}

export async function getLocalReport(id: string) {
  return await get(`report_${id}`);
}

export async function saveLocalReport(reportData: any) {
  const id = reportData.report.id || crypto.randomUUID();
  reportData.report.id = id;
  await set(`report_${id}`, reportData);
  return id;
}

export async function deleteLocalReport(id: string) {
  await del(`report_${id}`);
}

export async function resetLocalDb() {
  const reportsKeys = await keys();
  for (const k of reportsKeys) {
    if (typeof k === "string" && k.startsWith("report_")) {
      await del(k);
    }
  }
}

export async function saveAiSummaryLocally(reportId: string, summary: any) {
  const data = await get(`report_${reportId}`);
  if (data) {
    data.report.ai_summary = summary;
    await set(`report_${reportId}`, data);
  }
}
