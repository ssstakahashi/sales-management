import { SalesInputAction } from './actions';
import { push } from 'connected-react-router';

export const salesInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    console.log(state)

    dispatch(SalesInputAction({
      ...state,
      createAt           : new Date(),
      updateAt           : new Date(),
      salesSerialNumber  : data.salesSerialNumber,  // シリアルナンバー
      salesDay           : data.salesDay,　// 売上日
      supplierName       : data.supplierName,　// 取引先名
      supplierId     　  : data.supplierId,　// 取引先ID
      salesAmount        : data.salesAmount,  // 売上合計(税抜)
      salesSubject       : data.salesSubject,　// 件名
      salesDescription   : data.salesDescription,  // 摘要
      userId             : data.userId,
      existence          : data.existence, // 有効か否か
      taxIncluded      　: data.taxIncluded, // 税込み＝True 税抜き=false
      tax10 　　　　　　  : data.tax10,   // 10%対象額
      tax08              : data.tax08,   //  8%対象額
      consumptionTax     : data.consumptionTax,　 // 消費税額
      plannedDepositDate : data.plannedDepositDate,  // 入金予定日(売上時点)
      statement          : data.statement,
    }))
    dispatch(push('/'))
  }
}

