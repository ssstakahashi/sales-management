import { ReportAction } from './actions';

export const PaymentOperation = ( data ) => {
  return async( dispatch, getState ) => {
    dispatch( ReportAction() )
  }
}