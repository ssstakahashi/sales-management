import { SalesInputAction } from './actions';
import initialState from '../store/initialState';
import { salesCreate, salesDataGet } from './firebaseFunction';
import { db, firebaseTimestamp } from '../../firebase';
import _ from 'lodash';

const salesRef = db.collection('sales')

// データをFirebaseへ登録
export const salesInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    console.log(data)
    const serialNumber = data.serialNumber ? data.serialNumber : parseInt( state.sales.rows.length + 1 )
    const userId = state.users.uid
    const timeStamp = firebaseTimestamp.now()
    const statement = data.statement.map( x => x.amount !== 0 && x ).filter( x => x)
    console.log(statement)
    const inputData = {
      createAt           : data.createAt ? data.createAt : timeStamp,
      updateAt           : timeStamp,
      serialNumber       : serialNumber,  // シリアルナンバー
      // parentCode         : data.parentCode,  // 親コード
      salesDay           : data.salesDay,　// 売上日
      supplierName       : data.supplierName,　// 取引先名
      supplierId     　  : data.supplierId,　// 取引先ID
      totalAmount        : state.sales.totalAmount,  // 売上合計(税込)
      salesSubject       : data.salesSubject,　// 件名
      salesDescription   : data.salesDescription,  // 摘要
      salesEntity        : data.salesEntity,  // 売上主体（個人事業主としてか？法人としてか？）
      userId             : userId,
      existence          : true, // 有効か否か
      taxIncluded      　: data.taxIncluded, // 税込み＝True 税抜き=false

      // tax10 　　　　　　  : data.tax10,   // 10%対象額
      // tax08              : data.tax08,   //  8%対象額
      consumptionTax     : state.sales.consumptionTax,　 // 消費税額
      installmentPayment : data.installmentPayment,   // 回収回数
      depositRecord      : [{
        plannedDepositDate   : "",  // 入金予定日(売上時点)
        plannedDepositAmount : "",  // 入金予定額
        actualDepositDate    : "",  // 実際入金日
        actualDepositAmount  : "",  // 実際入金額
      }],   // 入金記録
      status             : data.status || "",   // 回収ステータス
      statement          : statement,
    }
    let id = data.docId || "";
    if ( !data.docId ) {
      const ref = salesRef.doc();
      id  = ref.id
    }
    salesCreate( inputData, id )
    let salesRows = state.sales.rows
    salesRows.unshift(inputData)
    salesRows = _.orderBy( _.uniqBy( salesRows, 'serialNumber' ), ['serialNumber'],['asc'])
    const nextData = {
      ...inputData,
      rows             : salesRows,
      open             : false,
      confirmationOpen : false,
    }
    dispatch( SalesInputAction( nextData ) )
  }
}


// データをFirebaseから取得
export const salesDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const getData = await salesDataGet().then((res)=>{
      console.log(res)
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
    console.log(statement)
    if ( remove ) {
      console.log(statement)
      await statement.pop()
      console.log(statement)
    }
    console.log(remove)
    console.log(statement)
    const totalAmountCalc = statement.map( x => x.amount )
    let totalAmount = totalAmountCalc.reduce( (accumulator, currentValue ) => {
      return accumulator + currentValue;
    });
    let consumptionTax = 0
    if ( taxIncluded ) {
      consumptionTax = parseInt( totalAmount - ( totalAmount / 1.1 ) )
    } else {
      consumptionTax = parseInt( totalAmount * 0.1 )
      totalAmount = totalAmount + consumptionTax
    }
    const salesData = await {
        ...state.sales,
        rows : state.sales.rows,
        statement,
        totalAmount,
        consumptionTax,
    }
    dispatch( SalesInputAction(salesData) )
  }
}

// ダイアログをオープン
export const salesDialogOpenOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row.open = true
    row.rows = state.sales.rows
    row.confirmationOpen = false
    console.log(row)
    dispatch( SalesInputAction( row ) )
  }
}

// ダイアログをクローズ
export const salesDialogCloseOperation = (row) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row = initialState.sales
    row.open = false
    row.rows = state.sales.rows
    row.confirmationOpen = false
    console.log(row)
    dispatch( SalesInputAction( row ) )
  }
}