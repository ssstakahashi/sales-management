import * as Actions from './actions';
import initialState from '../store/initialState';

export function CollectionReducer(state = initialState.collections, action) {
  switch (action.type) {
    case Actions.COLLECTIONS_INPUT:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};