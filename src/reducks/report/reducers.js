import * as Actions from './actions';
import initialState from '../store/initialState';

export function ReportReducer(state = initialState.Reports, action) {
  switch (action.type) {
    case Actions.REPORTS_INPUT:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};