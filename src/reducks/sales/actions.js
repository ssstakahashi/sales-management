export const SALES_INPUT = "SALES_INPUT";

export function SalesInputAction(salesData) {
  return {
    type: "SALES_INPUT",
    payload : salesData
  }
};