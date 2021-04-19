import { SupplierInputAction } from './actions';
import initialState from '../store/initialState';
import { SupplierDataGet, SupplierCreate, SupplierFirebaseDatabase } from './firebaseFunction';
import { db } from '../../firebase';
import _ from 'lodash';
import { DialogCloseOperation, DialogOpenOperation } from '../dialog/operations';

const supplierRef = db.collection('organization')
const timeStamp = new Date()

export const SupplierInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const userId = state.users.userId
    const createAt = data.createAt || timeStamp
    const updateAt = timeStamp
    let id = "";
    let inputData = SupplierFirebaseDatabase({ ...data, createAt, updateAt, userId })
    let arrayRows = state.suppliers.rows
    
    if ( !data.supplierId ) {
    // 新規データ
      const ref = supplierRef.doc(organizationId).collection('suppliers').doc();
      id  = ref.id
      arrayRows.unshift({ ...inputData, supplierId : id })
      arrayRows = _.orderBy( arrayRows,  ['createAt'], ['desc'] )
    } else {
    // データの更新
      id = data.supplierId
      const arrayIndex = _.findIndex( arrayRows, ['supplierId', id]);
      arrayRows.splice( arrayIndex, 1, inputData)
    }
    // Firebaseへの更新
    SupplierCreate( inputData, id, organizationId )
    // 状態保持更新
    dispatch( SupplierInputAction({ state: initialState.suppliers.state, rows : arrayRows }))
    // ダイアログを閉じる
    dispatch( DialogCloseOperation('suppliers') )
    
  }
}

export const SupplierDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const getData = await SupplierDataGet(organizationId).then(async(res)=>{
      return await res
    });
    const supplierData = await { ...state.suppliers.state, rows: getData }
    dispatch( SupplierInputAction(supplierData) )
  }
}

export const SupplierDialogOpenOperation = ( row = initialState.suppliers.state ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const rows = state.suppliers.rows
    dispatch( SupplierInputAction({ state: row, rows }) )
    // ダイアログを開ける
    dispatch( DialogOpenOperation('suppliers') )
  }
}

export const SupplierDialogCloseOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const row = initialState.suppliers.state  // 初期化
    const rows = state.suppliers.rows
    dispatch( SupplierInputAction({ state: row, rows }) )
    // ダイアログを閉じる
    dispatch( DialogCloseOperation('suppliers') )
  }
}

