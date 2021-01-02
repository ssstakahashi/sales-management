import { SupplierInputAction } from './actions';
import { push } from 'connected-react-router';
import initialState from '../store/initialState';
import { supplierDataGet, supplierCreate } from './firebaseFunction';
import { db, firebaseTimestamp } from '../../firebase';
import _ from 'lodash';

const supplierRef = db.collection('organization')

export const supplierInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const timeStamp = firebaseTimestamp.now()
    let id = "";
    if ( !data.supplierId ) {
      const ref = supplierRef.doc(organizationId).collection('supplier').doc();
      id  = ref.id
    }
    const inputData = {
      supplierId       : data.supplierId || id,
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
    supplierCreate( inputData, id, organizationId )
    let arrayRows = await state.supplier.rows
    arrayRows.unshift({ ...inputData, docId : id })
    const Rows = await _.orderBy( _.uniqBy( arrayRows, 'docId'),  ['createAt'], ['desc'] )
    console.log(Rows)

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
    row.rows = state.supplier.rows
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
    const organizationId = state.users.organizationId
    const getData = await supplierDataGet(organizationId).then(async(res)=>{
      await console.log(res)
      return await res
    });
    const supplierData = await {
        ...state.supplier,
        rows : getData,
    }
    dispatch( SupplierInputAction(supplierData) )
  }
}