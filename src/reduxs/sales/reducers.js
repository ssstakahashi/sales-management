import * as Actions from './actions';
import initialState from '../store/initialState';

export function SalesReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.SALES_INPUT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};