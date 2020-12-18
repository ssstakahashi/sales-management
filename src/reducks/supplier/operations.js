import { SupplierInputAction } from './actions';
import { push } from 'connected-react-router';
import initialState from '../store/initialState';
import { supplierDataGet, supplierCreate } from './firebaseFunction';
import { db, firebaseTimestamp } from '../../firebase';
import _ from 'lodash';

const supplierRef = db.collection('supplier')

export const supplierInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const timeStamp = firebaseTimestamp.now()
    const supplierId = data.supplierId ? data.supplierId : getUniqueStr(10000);
    function getUniqueStr(strong){
      if (strong)
        return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
     }
    const inputData = {
      supplierId,
      createAt         : data.createAt ? data.createAt : timeStamp,
      updateAt         : timeStamp,
      supTemporaryName : data.supTemporaryName,
      supplierName     : data.supplierName || "",
      supplierAddress  : data.supplierAddress || "",
      supplierPostCode : data.supplierPostCode || "",
      supplierPhone    : data.supplierPhone || "",
      supplierEmail    : data.supplierEmail || "",
      supplierMobile   : data.supplierMobile || "",
      supplierInCharge : data.supplierInCharge || "",
      payoutPeriod     : data.payoutPeriod || "", //回収サイクル
    }
    let id = data.docId || "";
    if ( !data.docId ) {
      const ref = supplierRef.doc();
      id  = ref.id
    }
    supplierCreate( inputData, id )
    let arrayRows = await state.supplier.rows
    console.log(arrayRows)
    arrayRows.unshift({ ...inputData, docId : id })
    const Rows = await _.orderBy( _.uniqBy( arrayRows, 'docId'),  ['createAt'], ['desc'] )

    dispatch( SupplierInputAction({
      ...inputData,
      rows : Rows,
      open : false,
    }))
  }
}

export const supplierDialogOpenOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row.open = true
    console.log(state)
    row.rows = state.supplier.rows
    console.log(row)
    dispatch( SupplierInputAction( row ) )
  }
}

export const supplierDialogCloseOperation = ( row = {} ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row = initialState.supplier
    row.open = false
    row.rows = state.supplier.rows
    dispatch( SupplierInputAction({
        ...row,
      }))
  }
}

export const supplierDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    console.log("テスト",state)
    const getData = await supplierDataGet().then((res)=>{
      console.log(res)
      return res
    });
    const supplierData = await {
        ...state.supplier,
        rows : getData,
    }
    dispatch( SupplierInputAction(supplierData) )
  }
}