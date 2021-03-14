import { DialogAction } from './actions';
import initialState from '../store/initialState';

export const DialogOpenOperation = ( column1, column2 ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    let data = {}
    if ( column1 ) {
      if ( !column2 ) {
        data = {
          ...state.dialogs,
          [column1] : true,
        }
      } else {
        data = {
          ...state.dialogs,
          [column1] : true,
          [column2] : true,
        }
      }
    }  
    dispatch( DialogAction(data))
  }
}

export const DialogCloseOperation = ( column1, column2 ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    let data = {}
    if ( column1 ) {
      if ( !column2 ) {
        data = {
          ...state.dialogs,
          [column1] : false,
        }
      } else {
        data = {
          ...state.dialogs,
          [column1] : false,
          [column2] : false,
        }
      }
    } else {
      data = initialState.dialogs
    }  
    dispatch( DialogAction(data))
  }
}