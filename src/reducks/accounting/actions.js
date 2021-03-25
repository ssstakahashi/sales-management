export const ACCOUNTING_INPUT = "ACCOUNTING_INPUT";

export function AccountingInputAction(accountingData) {
  return {
    type    : "ACCOUNTING_INPUT",
    payload : accountingData,
  }
};