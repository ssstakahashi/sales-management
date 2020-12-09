export const SUPPLIER_INPUT = "SUPPLIER_INPUT";

export function SupplierInputAction(supplierData) {
  return {
    type    : "SUPPLIER_INPUT",
    payload : supplierData,
  }
};