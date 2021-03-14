export const PAYMENTS_INPUT = "PAYMENTS_INPUT";

export function PaymentInputAction(PaymentsData) {
  return {
    type    : "PAYMENTS_INPUT",
    payload : PaymentsData,
  }
};