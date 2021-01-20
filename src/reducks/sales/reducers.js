import * as Actions from './actions';
import initialState from '../store/initialState';

export function SalesReducer(state = initialState.sales, action) {
  console.log(Actions)
  switch (action.type) {
    case Actions.SALES_INPUT:
      return action.payload
    default:
      return state;
  }
};