import * as Actions from './actions';
import initialState from '../store/initialState';

export function SupplierReducer(state = initialState.supplier, action) {
  switch (action.type) {
    case Actions.SUPPLIER_INPUT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};