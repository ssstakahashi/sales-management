import { SupplierInputAction } from './actions';
import { push } from 'connected-react-router';

export const supplierInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    console.log(state)
    console.log(data)
    // const supplierId = 1;
    
    // function getUniqueStr(strong){
    //   if (strong)
    //     return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    //  }

    dispatch( SupplierInputAction({
      ...state,
      createAt         : new Date(),
      updateAt         : data.updateAt,
      supplierName     : data.supplierName,
      supplierAddress  : data.supplierAddress,
      supplierId       : data.supplierId,
      supplierPhone    : data.supplierPhone,
      supplierMobile   : data.supplierMobile,
      supplierInCharge : data.supplierInCharge,
    }))
    dispatch(push('/'))
  }
}