import { SalesInputAction } from './actions';
import initialState from '../store/initialState';
import { DepositRecordDatabase, SalesCreate, SalesDatabase, SalesDataGet } from './firebaseFunction';
import { db } from '../../firebase';
import _ from 'lodash';
import { getUserId } from '../users/selectors';

import { ConsumptionTax, DayChangePayoutPeriod } from '../../components/function';


const salesRef = db.collection('organization')
const timeStamp = new Date()

// データをFirebaseへ登録
export const SalesInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    let arrayRows = state.sales.rows
    const organizationId = state.users.organizationId
    const serialNumber = data.serialNumber ? data.serialNumber : parseInt( state.sales.rows.length + 1 )
    const userId = getUserId(state)
    const statement = data.statement.map( x => x.amount !== 0 && x ).filter( x => x )

    // salesRows = _.orderBy( _.uniqBy( salesRows, 'serialNumber' ), ['serialNumber'],['asc'])
    const inputData = {
      createAt           : data.createAt ? data.createAt : timeStamp,
      updateAt           : timeStamp,
      serialNumber       : serialNumber,  // シリアルナンバー
      // parentCode         : data.parentCode,  // 親コード
      salesDay           : data.salesDay,　// 売上日
      supplierName       : data.supplierName,　// 取引先名
      supplierId     　  : data.supplierId,　// 取引先ID
      totalAmount        : data.totalAmount,  // 売上合計(税込)
      billingAmount      : data.billingAmount, // 請求金額
      salesSubject       : data.salesSubject,　// 件名
      salesDescription   : data.salesDescription,  // 摘要
      salesEntity        : data.salesEntity,  // 売上主体（個人事業主としてか？法人としてか？）
      userId             : userId,
      salesId            : data.salesId,
      existence          : true, // 有効か否か
      taxIncluded      　: data.taxIncluded, // 税込み＝True 税抜き=false

      // tax10 　　　　　　  : data.tax10,   // 10%対象額
      // tax08              : data.tax08,   //  8%対象額
      consumptionTax     : state.sales.consumptionTax,　 // 消費税額

      status             : data.status || false,   // 回収ステータス
      statement          : statement,
    }

    let id = data.salesId || null;
    if ( !data.salesId ) {
      // データの新規作成
      const ref = salesRef.doc(organizationId).collection('sales').doc();
      id  = ref.id
      arrayRows.unshift({ ...inputData, salesId : id })
    } else {
      // データの更新
      const arrayIndex = _.findIndex( arrayRows, ['salesId', data.salesId]);
      arrayRows.splice( arrayIndex, 1, inputData)
      id = data.salesId
    }

    SalesCreate( inputData, id, organizationId )

    const nextData = {
      ...inputData,
      rows             : arrayRows,
      confirmationOpen : false,
    }
    dispatch( SalesInputAction( nextData ) )
  }
}

// データをFirebaseから取得
export const SalesDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const getData = await SalesDataGet(organizationId).then((res)=>{
      return _.orderBy( res,['serialNumber'],['asc'])
    });
    const salesData = await {
        ...initialState.sales,
        rows : getData,
    }
    dispatch( SalesInputAction(salesData) )
  }
}

// 明細データを追加
export const StatementPush = ( row, taxIncluded, remove = false ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row.statementNo = row.statementNo || state.sales.statement.length + 1
    let statement = state.sales.statement
    await statement.unshift(row)
    statement = await _.orderBy( _.uniqBy( statement, 'statementNo' ), ['statementNo'],['asc'])
    if ( remove ) {
      await statement.pop()
    }
    const totalAmountCalc = statement.map( x => x.amount )
    const totalAmount = totalAmountCalc.reduce( (accumulator, currentValue ) => {
      if (taxIncluded) {
        return accumulator + currentValue
      } else {
        return ( accumulator * 1.1 ) + currentValue
      }
    });
    const consumptionTax = ConsumptionTax( taxIncluded, totalAmount )
    let billingAmount = 0;
    if (taxIncluded) {
      billingAmount = totalAmount
    } else {
      billingAmount = totalAmount + consumptionTax
    }

    // let consumptionTax = 0
    // if ( taxIncluded ) {
    //   consumptionTax = parseInt( totalAmount - ( totalAmount / 1.1 ) )
    // } else {
    //   consumptionTax = parseInt( totalAmount * 0.1 )
    //   totalAmount = totalAmount + consumptionTax
    // }
    const salesData = await {
        ...state.sales,
        rows : state.sales.rows,
        statement,
        totalAmount,
        consumptionTax,
        billingAmount,
    }
    dispatch( SalesInputAction(salesData) )
  }
}

// ダイアログをオープン
export const SalesDialogOpenOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row.rows = state.sales.rows
    row.confirmationOpen = false
    dispatch( SalesInputAction( row ) )
  }
}

// ダイアログをクローズ
export const SalesDialogCloseOperation = (row) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row = initialState.sales
    row.rows = state.sales.rows
    row.confirmationOpen = false
    dispatch( SalesInputAction( row ) )
  }
}

export const PlusPaymentStatementOperation = ( remove = false ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    // const totalAmount  =  state.sales.totalAmount// 売上合計額
    let statementRecord = state.sales.statement
    const plannedDepositDate = DayChangePayoutPeriod( state.sales.salesDay, payoutPeriod ) || ""
    const plannedDepositAmount = state.sales.billingAmount || 0
    const payoutPeriod = state.suppliers.rows.find( x => x.supplierId === state.sales.supplierId ).payoutPeriod
    const serialPaymentNumber = state.sales.statement.length + 1
    const statement = DepositRecordDatabase({
      serialPaymentNumber,
      salesId               : state.sales.salesId,
      done                  : false,
      plannedDepositDate    : plannedDepositDate,
      plannedDepositAmount  : plannedDepositAmount,
      actualDepositDate     : "",
      actualDepositAmount   : 0,
    })
    if ( !remove ) {
      await statementRecord.unshift(statement)
    } else {
      await statementRecord.pop()
    }
    statementRecord = await _.orderBy( _.uniqBy( statementRecord, 'serialPaymentNumber' ), ['serialPaymentNumber'],['asc'])

    statementRecord = statementRecord.map( x =>  parseInt(x.actualDepositAmount) )
    const plannedTotalAmount = statementRecord.reduce( (accumulator, currentValue ) => {
      return accumulator + currentValue  // 一部未回収
    });
    const actualTotalAmount = statementRecord.reduce( (accumulator, currentValue ) => {
      return accumulator + currentValue  // 一部未回収
    });
    const installmentPayment = statementRecord.length
    // if ( totalAmount === actualTotalAmount ) { done = true }
    dispatch( SalesInputAction({ ...state.sales, plannedTotalAmount, actualTotalAmount, statementRecord, installmentPayment }) )
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
    dispatch( SalesInputAction(data) )
  }
}
