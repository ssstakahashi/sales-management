import * as Actions from './actions';
import initialState from '../store/initialState';

export function DialogReducer(state = initialState.Dialogs, action) {
  switch (action.type) {
    case Actions.DIALOGS_INPUT:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};