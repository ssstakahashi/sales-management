import { SupplierInputAction } from './actions';
import { push } from 'connected-react-router';

export const supplierInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    console.log(state)
    // const supplierId = 1;
    
    // function getUniqueStr(strong){
    //   if (strong) 
    //     return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    //  }

    dispatch( SupplierInputAction({
      ...state,
      createAt         : data.createAt ? data.createAt : new Date(),
      updateAt         : new Date(),
      supplierName     : data.supplierName,
      supplierAddress  : data.supplierAddress,
      supplierId       : data.supplierId,
      supplierPhone    : data.supplierData.proName,
      supplierMobile   : data.supplierData.supplierMobile,
      supplierInCharge : data.supplierData.supplierInCharge,
    }))
    dispatch(push('/'))
  }
}