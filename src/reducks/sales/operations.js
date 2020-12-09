import { SalesInputAction } from './actions';
import { push } from 'connected-react-router';

export const salesInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    console.log(state)

    dispatch(SalesInputAction({
      ...state,
      salesDay     : data.salesDay,
      customerName : data.customerName,
      amount       : data.amount,
      // proId        : salesData.proId,
      proName      : data.proName,
      userId       : data.userId,
    }))
    dispatch(push('/'))
  }
}