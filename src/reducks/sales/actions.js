export const SALES_INPUT = "SALES_INPUT";

export function SalesInputAction(salesData) {
  return {
    type: "SALES_INPUT",
    payload : {
      createAt     : new Date(),
      updateAt     : new Date(),
      salesDay     : salesData.salesDay,
      customerName : salesData.customerName,
      amount       : salesData.amount,
      // proId        : salesData.proId,
      proName      : salesData.proName,
      userId       : salesData.userId,
    }
  }
};