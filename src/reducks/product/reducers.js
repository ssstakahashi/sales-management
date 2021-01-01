import * as Actions from './actions';
import initialState from '../store/initialState';

export function ProductReducer(state = initialState.products, action) {
  switch (action.type) {
    case Actions.PRODUCTS_INPUT:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};