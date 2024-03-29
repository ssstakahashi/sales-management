import * as Actions from './actions';
import initialState from '../store/initialState';

export function DialogReducer(state = initialState.dialogs, action) {
  switch (action.type) {
    case Actions.DIALOGS_INPUT:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};