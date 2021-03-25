import * as Actions from './actions';
import initialState from '../store/initialState';

export function AccountingReducer(state = initialState.accountings, action) {
  switch (action.type) {
    case Actions.ACCOUNTING_INPUT:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};