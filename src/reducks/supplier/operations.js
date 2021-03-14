import { SupplierInputAction } from './actions';
import initialState from '../store/initialState';
import { SupplierDataGet, SupplierCreate } from './firebaseFunction';
import { db } from '../../firebase';
import _ from 'lodash';

const supplierRef = db.collection('organization')
const timeStamp = new Date()

export const SupplierInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
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
    SupplierCreate( inputData, id, organizationId )
    let arrayRows = await state.suppliers.rows
    arrayRows.unshift({ ...inputData, docId : id })
    const Rows = await _.orderBy( _.uniqBy( arrayRows, 'docId'),  ['createAt'], ['desc'] )

    dispatch( SupplierInputAction({
      ...inputData,
      rows : Rows,
      open : false,
    }))
  }
}

export const SupplierDialogOpenOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row.open = true
    row.rows = state.suppliers.rows
    dispatch( SupplierInputAction( row ) )
  }
}

export const SupplierDialogCloseOperation = ( row = {} ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row = initialState.suppliers
    row.open = false
    row.rows = state.suppliers.rows
    dispatch( SupplierInputAction({
        ...row,
      }))
  }
}

export const SupplierDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const getData = await SupplierDataGet(organizationId).then(async(res)=>{
      return await res
    });
    const supplierData = await {
        ...state.suppliers,
        rows : getData,
    }
    dispatch( SupplierInputAction(supplierData) )
  }
}