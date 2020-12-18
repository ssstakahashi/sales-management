import * as Actions from './actions';
import initialState from '../store/initialState';

export function SalesReducer(state = initialState.sales, action) {
  switch (action.type) {
    case Actions.SALES_INPUT:
      return action.payload.sales
    default:
      return state;
  }
};