export const PRODUCTS_INPUT = "PRODUCTS_INPUT";

export function ProductInputAction(productsData) {
  return {
    type    : "PRODUCTS_INPUT",
    payload : productsData,
  }
};