import { SalesInputAction } from './actions';
import initialState from '../store/initialState';
import { depositRecordDatabase, salesCreate, salesDatabase, salesDataGet } from './firebaseFunction';
import { db, firebaseTimestamp } from '../../firebase';
import _ from 'lodash';
import { getUserId } from '../users/selectors';

import { ConsumptionTax, DayChangePayoutPeriod } from '../../components/function';


const salesRef = db.collection('organization')

// データをFirebaseへ登録
export const salesInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const serialNumber = data.serialNumber ? data.serialNumber : parseInt( state.sales.rows.length + 1 )
    const userId = getUserId(state)
    const timeStamp = firebaseTimestamp.now()
    const statement = data.statement.map( x => x.amount !== 0 && x ).filter( x => x)
    let depositRecord = state.sales.depositRecord
    depositRecord.unshift()
    // salesRows = _.orderBy( _.uniqBy( salesRows, 'serialNumber' ), ['serialNumber'],['asc'])
    const _inputData = {
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
      docId              : data.docId,
      existence          : true, // 有効か否か
      taxIncluded      　: data.taxIncluded, // 税込み＝True 税抜き=false

      // tax10 　　　　　　  : data.tax10,   // 10%対象額
      // tax08              : data.tax08,   //  8%対象額
      consumptionTax     : state.sales.consumptionTax,　 // 消費税額
      installmentPayment : data.installmentPayment,   // 回収回数
      depositRecord      : [
        // {
        // plannedDepositDate   : "",  // 入金予定日(売上時点)
        // plannedDepositAmount : "",  // 入金予定額
        // actualDepositDate    : "",  // 実際入金日
        // actualDepositAmount  : "",  // 実際入金額
      // }
      ],   // 入金記録
      status             : data.status || "",   // 回収ステータス
      statement          : statement,
    }
    const inputData = salesDatabase( _inputData )
    let id = data.docId || "";
    if ( !data.docId ) {
      const ref = salesRef.doc(organizationId).collection('sales').doc();
      id  = ref.id
    }
    salesCreate( inputData, id, organizationId )
    let salesRows = state.sales.rows
    salesRows.unshift(inputData)
    salesRows = _.orderBy( _.uniqBy( salesRows, 'serialNumber' ), ['serialNumber'],['asc'])
    const nextData = {
      ...inputData,
      rows             : salesRows,
      confirmationOpen : false,
    }
    dispatch( SalesInputAction( nextData ) )
  }
}

// データをFirebaseから取得
export const salesDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const getData = await salesDataGet(organizationId).then((res)=>{
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
export const statementPush = ( row, taxIncluded, remove = false ) => {
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
export const salesDialogOpenOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row.rows = state.sales.rows
    row.confirmationOpen = false
    dispatch( SalesInputAction( row ) )
  }
}

// ダイアログをクローズ
export const salesDialogCloseOperation = (row) => {
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
    console.log(state)
    console.log("支払い回数追加")
    // const totalAmount  =  state.sales.totalAmount// 売上合計額
    let depositRecord = state.sales.depositRecord
    const plannedDepositAmount = state.sales.billingAmount || 0
    const payoutPeriod = state.supplier.rows.find( x => x.supplierId === state.sales.supplierId ).payoutPeriod
    const plannedDepositDate = DayChangePayoutPeriod( state.sales.salesDay, payoutPeriod ) || ""
    console.log(plannedDepositDate)
    const _statement = {
      serialPaymentNumber       : state.sales.depositRecord.length + 1,
      docId                     : state.sales.docId,
      done                      : false,
      plannedDepositDate        : plannedDepositDate,
      plannedDepositAmount      : plannedDepositAmount,
      actualDepositDate         : "",
      actualDepositAmount       :  0,
    }
    const statement = depositRecordDatabase( _statement )
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
    dispatch( SalesInputAction({ ...state.sales, plannedTotalAmount, actualTotalAmount, depositRecord, installmentPayment }) )
  }
}
export const TotalCalculationPaymentStatementOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    console.log("計算回数")
    console.log(row)
    // const totalAmount  =  state.sales.totalAmount// 売上合計額
    let depositRecord = state.sales.depositRecord
    const statement = {
      ...row,
      actualDepositDate   : row.done ? row.plannedDepositDate   : row.actualDepositDate,
      actualDepositAmount : row.done ? row.plannedDepositAmount : row.actualDepositAmount,
    }
    depositRecord[row.serialPaymentNumber - 1] = statement
    // await depositRecord.unshift(statement)
    console.log(depositRecord)
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
