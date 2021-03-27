import { AccountingInputAction } from './actions';
import { AccountingDataGet, AccountingCreate } from './firebaseFunction';
import { db } from '../../firebase';
import _ from 'lodash';
import initialState from '../store/initialState';
import { DialogOpenOperation } from '../dialog/operations';

const accountingRef = db.collection('organization')
const timeStamp = new Date()

export const AccountingInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    let arrayRows = state.accountings.rows
    let id = "";
    let inputData = {
      ...data,
      createAt : data.createAt || timeStamp,
      updateAt : timeStamp,
    }
    if ( !data.accountingId ) {
      // データの新規作成
      const ref = accountingRef.doc(organizationId).Accounting('accounting').doc();
      id  = ref.id
      arrayRows.unshift({ ...inputData, accountingId : id })
    } else {
      // データの更新
      const arrayIndex = _.findIndex( arrayRows, ['accountingId', data.accountingId]);
      arrayRows.splice( arrayIndex, 1, inputData)
      id = data.accountingId
    }
    arrayRows = await _.orderBy( arrayRows, ['createAt'], ['desc'] )
    AccountingCreate( inputData, id, organizationId )
    dispatch( AccountingInputAction({ ...inputData, rows : arrayRows }))
  }
}


export const AccountingDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const getData = await AccountingDataGet(organizationId).then((res)=>{
      return res
    });
    const AccountingData = await {
        ...state.accountings,
        rows : getData,
    }
    dispatch( AccountingInputAction(AccountingData) )
  }
}

export const AccountingDialogOpenOperation = (row = initialState.accountings) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const AccountingData = await { ...state.accountings, ...row }
    dispatch( AccountingInputAction(AccountingData) )
    dispatch( DialogOpenOperation('accountings'))
  }
}
export const AddStatementOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const statement = state.accountings.statement
    const addData = initialState.accountings.statement[0]
    statement.push(addData)
    const AccountingData = await { ...state.accountings, statement }
    dispatch( AccountingInputAction(AccountingData) )
  }
}
export const ReduceStatementOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const statement = state.accountings.statement
    statement.pop()
    const AccountingData = { ...state.accountings, statement }
    dispatch( AccountingInputAction(AccountingData) )
  }
}
export const StatusChangeOperation = ( row, index ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const statement = state.accountings.statement
    statement[index] = row
    const AccountingData = { ...state.accountings, statement }
    dispatch( AccountingInputAction(AccountingData) )
  }
}

