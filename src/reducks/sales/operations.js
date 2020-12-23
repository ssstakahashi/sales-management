import { SalesInputAction } from './actions';
import { push } from 'connected-react-router';
import initialState from '../store/initialState';
import { salesCreate, salesDataGet } from './firebaseFunction';
import { firebaseTimestamp } from '../../firebase';

export const salesInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const serialNumber = data.docId ? data.serialNumber : parseInt( state.sales.rows.length + 1 )
    const userId = state.users.id
    console.log(state)
    const timeStamp = firebaseTimestamp.now()

    const inputData = {
      createAt           : data.createAt ? data.createAt : timeStamp,
      updateAt           : timeStamp,
      serialNumber       : serialNumber,  // シリアルナンバー
      parentCode         : data.parentCode,  // 親コード
      salesDay           : data.salesDay,　// 売上日
      supplierName       : data.supplierName,　// 取引先名
      supplierId     　  : data.supplierId,　// 取引先ID
      totalAmount        : data.totalAmount,  // 売上合計(税込)
      salesSubject       : data.salesSubject,　// 件名
      salesDescription   : data.salesDescription,  // 摘要
      salesEntity        : data.salesEntity,  // 売上主体（個人事業主としてか？法人としてか？）
      userId             : userId,
      existence          : true, // 有効か否か
      taxIncluded      　: data.taxIncluded, // 税込み＝True 税抜き=false
      productId          : data.productId,　 // 商品ID
      productName        : data.productName,　 // 商品名
      price              : data.price,   // 単価
      quantity           : data.quantity,   // 数量
      unit               : data.unit,   // 単位
      amount             : data.amount,   // 金額
      tax10 　　　　　　  : data.tax10,   // 10%対象額
      tax08              : data.tax08,   //  8%対象額
      consumptionTax     : data.consumptionTax,　 // 消費税額
      installmentPayment : data.installmentPayment,   // 回収回数
      depositRecord      : [{
        plannedDepositDate   : "",  // 入金予定日(売上時点)
        plannedDepositAmount : "",  // 入金予定額
        actualDepositDate    : "",  // 実際入金日
        actualDepositAmount  : "",  // 実際入金額
  
      }],   // 入金記録 
      status             : data.status,   // 回収ステータス 
      statement          : [],
    }
    dispatch(salesCreate(inputData))
    const salesRow = state.sales.rows
    salesRow.unshift(inputData)
    const nextData = {
      ...inputData,
      rows : salesRow,
      open : false,
    }
    dispatch( SalesInputAction( nextData ) )
  }
}

// export const amountChange = (data) => {
//   return async( dispatch, getState ) => {
//     const state = getState()
//     console.log(state)
//     const sales = state.sales
//     console.log(sales)
//     console.log(data)
//     sales.statement.push(data)
//     console.log(state.statement)
//     dispatch( SalesInputAction({ ...sales}) )
//   }
// }

export const salesDialogOpenOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row = initialState.sales
    row.open = true
    row.rows = state.sales.rows
    console.log(row)
    dispatch( SalesInputAction( row ) )
  }
}

export const salesDialogCloseOperation = ( row = {} ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row = initialState.sales
    row.open = false
    row.rows = state.sales.rows
    dispatch( SalesInputAction({
        ...row,
      }))
  }
}

export const salesDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const getData = await salesDataGet().then((res)=>{
      return res
    });
    const supplierData = await {
        ...state.supplier,
        rows : getData,
    }
    dispatch( SalesInputAction(supplierData) )
  }
}

