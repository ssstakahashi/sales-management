export const SALES_INPUT = "SALES_INPUT";

export function SalesInputAction(salesData) {
  return {
    type: "SALES_INPUT",
    payload : {
      createAt: new Date(),
      amount  : salesData.amount,
      proName : salesData.proName,


    }
  }
};