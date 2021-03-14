import * as Actions from './actions';
import initialState from '../store/initialState';

export function PaymentReducer(state = initialState.payments, action) {
  switch (action.type) {
    case Actions.PAYMENTS_INPUT:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};