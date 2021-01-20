import { db } from "../../firebase";

const salesRef = db.collection('organization')

export const salesCreate = ( inputData, id, organizationId ) => {
  salesRef.doc(organizationId).collection('sales').doc( id ).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

// Firebaseからデータを取得
export const salesDataGet = async(organizationId) => {
  let salesData = []
  await salesRef.doc(organizationId).collection('sales').get()
    .then( querySnapshot => {
      querySnapshot.forEach( doc => {
          salesData.push({...doc.data(), docId: doc.id })
      });
    })
  return salesData
}

export const salesDatabase = (data) => (
  {
    createAt           : data.createAt,
    updateAt           : data.updateAt,
    serialNumber       : data.serialNumber,  // シリアルナンバー
    // parentCode         : data.parentCode,  // 親コード
    salesDay           : data.salesDay,　// 売上日
    supplierName       : data.supplierName,　// 取引先名
    supplierId     　  : data.supplierId,　// 取引先ID
    totalAmount        : data.totalAmount,  // 売上合計(税込)
    billingAmount      : data.billingAmount, // 請求金額
    salesSubject       : data.salesSubject,　// 件名
    salesDescription   : data.salesDescription,  // 摘要
    salesEntity        : data.salesEntity,  // 売上主体（個人事業主としてか？法人としてか？）
    userId             : data.userId,
    docId              : data.docId,
    existence          : data.true, // 有効か否か
    taxIncluded      　: data.taxIncluded, // 税込み＝True 税抜き=false

    // tax10 　　　　　　  : data.tax10,   // 10%対象額
    // tax08              : data.tax08,   //  8%対象額
    consumptionTax     : data.consumptionTax,　 // 消費税額
    installmentPayment : data.installmentPayment,   // 回収回数
    depositRecord      : data.depositRecord,
      // {
      // plannedDepositDate   : "",  // 入金予定日(売上時点)
      // plannedDepositAmount : "",  // 入金予定額
      // actualDepositDate    : "",  // 実際入金日
      // actualDepositAmount  : "",  // 実際入金額
    // }
     // 入金記録
    status             : data.status,   // 回収ステータス
    statement          : data.statement,
  }
)

export const depositRecordDatabase = (data) => ({
  serialPaymentNumber       : data.serialPaymentNumber,
  docId                     : data.docId,
  done                      : data.done,
  plannedDepositDate        : data.plannedDepositDate,
  plannedDepositAmount      : data.plannedDepositAmount,
  actualDepositDate         : data.actualDepositDate,
  actualDepositAmount       : data.actualDepositAmount,
})