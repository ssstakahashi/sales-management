export const REPORTS_INPUT = "REPORTS_INPUT";

export function ReportAction(ReportsData) {
  return {
    type    : "REPORTS_INPUT",
    payload : ReportsData,
  }
};