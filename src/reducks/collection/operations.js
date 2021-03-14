import { CollectionInputAction } from './actions';
import { CollectionDataGet, CollectionCreate } from './firebaseFunction';
import { db } from '../../firebase';
import _ from 'lodash';
import { DayChangePayoutPeriod } from '../../components/function';
import { DepositRecordDatabase } from '../sales/firebaseFunction';

const collectionRef = db.collection('organization')
const timeStamp = new Date()

export const CollectionInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId   
    let id = "";
    if ( !data.collectionId ) {
      const ref = collectionRef.doc(organizationId).collection('collections').doc();
      id  = ref.id
    }
    const inputData = {
      createAt             : data.createAt || timeStamp,
      updateAt             : timeStamp,

      installmentPayment   :  1,   // 回収回数
      plannedTotalAmount   :  0,   // 入金予定総額
      actualTotalAmount    :  0,   // 入金総額
      collectionStatus     : "",
      collectionDone       : false,  // 入金済みか否か
      plannedDepositDate   : "",  // 入金予定日(売上時点)
      plannedDepositAmount : "",  // 入金予定額
      actualDepositDate    : "",  // 実際入金日
      actualDepositAmount  : "",  // 実際入金額
      serialPaymentNumber  :  1,
      salesId              : "",  // 販売データID
      collectionId         : "",  // 請求データID
    }
    CollectionCreate( inputData, id, organizationId )
    let arrayRows = await data.rows
    arrayRows.unshift({ ...inputData, docId : id })
    const Rows = await _.orderBy( _.uniqBy( arrayRows, 'docId'),  ['createAt'], ['desc'] )

    dispatch( CollectionInputAction({
      ...inputData,
      rows : Rows,
    }))
  }
}


export const CollectionDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const getData = await CollectionDataGet(organizationId).then((res)=>{
      return res
    });
    const collectionData = await {
        ...state.collections,
        rows : getData,
    }
    dispatch( CollectionInputAction(collectionData) )
  }
}


export const PlusPaymentStatementOperation = ( remove = false ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    // const totalAmount  =  state.sales.totalAmount// 売上合計額
    let depositRecord = state.sales.depositRecord
    const plannedDepositAmount = state.sales.billingAmount || 0
    const payoutPeriod = state.supplier.rows.find( x => x.supplierId === state.sales.supplierId ).payoutPeriod
    const plannedDepositDate = DayChangePayoutPeriod( state.sales.salesDay, payoutPeriod ) || ""

    const _statement = {
      serialPaymentNumber       : state.sales.depositRecord.length + 1,
      docId                     : state.sales.docId,
      done                      : false,
      plannedDepositDate        : plannedDepositDate,
      plannedDepositAmount      : plannedDepositAmount,
      actualDepositDate         : "",
      actualDepositAmount       :  0,
    }
    const statement = DepositRecordDatabase( _statement )
    if ( !remove ) {
      await depositRecord.unshift(statement)
    } else {
      await depositRecord.pop()
    }
    depositRecord = await _.orderBy( _.uniqBy( depositRecord, 'serialPaymentNumber' ), ['serialPaymentNumber'],['asc'])

    const _depositRecord = depositRecord.map( x =>  parseInt(x.actualDepositAmount) )
    const plannedTotalAmount = _depositRecord.reduce( (accumulator, currentValue ) => {
      return accumulator + currentValue  // 一部未回収
    });
    const actualTotalAmount = _depositRecord.reduce( (accumulator, currentValue ) => {
      return accumulator + currentValue  // 一部未回収
    });
    const installmentPayment = _depositRecord.length
    // if ( totalAmount === actualTotalAmount ) { done = true }
    // dispatch( SalesInputAction({ ...state.sales, plannedTotalAmount, actualTotalAmount, depositRecord, installmentPayment }) )
  }
}
export const TotalCalculationPaymentStatementOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()

    // const totalAmount  =  state.sales.totalAmount// 売上合計額
    let depositRecord = state.sales.depositRecord
    const statement = {
      ...row,
      actualDepositDate   : row.done ? row.plannedDepositDate   : row.actualDepositDate,
      actualDepositAmount : row.done ? row.plannedDepositAmount : row.actualDepositAmount,
    }
    depositRecord[row.serialPaymentNumber - 1] = statement
    // await depositRecord.unshift(statement)
    depositRecord = await _.orderBy( _.uniqBy( depositRecord, 'serialPaymentNumber' ), ['serialPaymentNumber'],['asc'])
    const _depositRecord = depositRecord.map( x => parseInt( x.actualDepositAmount) )
    const plannedTotalAmount = _depositRecord.reduce( (accumulator, currentValue ) => {
      return accumulator + currentValue  // 一部未回収
    });
    const actualTotalAmount = _depositRecord.reduce( (accumulator, currentValue ) => {
      return accumulator + currentValue
    });
    // if ( totalAmount === actualTotalAmount ) { done = true }
    const data = {
      ...state.sales, plannedTotalAmount, actualTotalAmount, depositRecord
    }
    // dispatch( SalesInputAction(data) )
  }
}