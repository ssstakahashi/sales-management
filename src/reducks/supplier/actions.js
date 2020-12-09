export const SUPPLIER_INPUT = "SUPPLIER_INPUT";

export function SupplierInputAction(supplierData) {
  return {
    type: "SUPPLIER_INPUT",
    payload : {
      createAt         : supplierData.createAt,
      updateAt         : supplierData.updateAt,
      supplierName     : supplierData.supplierName,
      supplierAddress  : supplierData.supplierAddress,
      supplierId       : supplierData.supplierId,
      supplierPhone    : supplierData.proName,
      supplierMobile   : supplierData.supplierMobile,
      supplierInCharge : supplierData.supplierInCharge,
    }
  }
};