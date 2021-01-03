const initialState = {
  sales : {

    confirmationOpen : false,
    rows             : [],

    createAt           : "",
    updateAt           : "",
    serialNumber       : "",  // シリアルナンバー
    parentCode         : "",  // 親コード
    salesDay           : "",　// 売上日
    supplierName       : "",　// 取引先名
    supplierId     　  : "",　// 取引先ID
    totalAmount        : 0,  // 売上合計(税抜)
    salesSubject       : "",　// 件名
    salesDescription   : "",  // 摘要
    salesEntity        : "",  // 売上主体（個人事業主としてか？法人としてか？）
    userId             : "",
    docId              : "",
    existence          : true, // 有効か否か
    taxIncluded      　: true, // 税込み＝True 税抜き=false
    productId          : "",　 // 商品ID
    productName        : "",　 // 商品名
    price              : "",   // 単価
    quantity           : "",   // 数量
    unit               : "",   // 単位
    amount             : 0,   // 金額
    tax10 　　　　　　  : 0,   // 10%対象額
    tax08              : 0,   //  8%対象額
    consumptionTax     : 0,　 // 消費税額
    installmentPayment :  1,   // 回収回数
    depositRecord      : [{
      plannedDepositDate   : "",  // 入金予定日(売上時点)
      plannedDepositAmount : "",  // 入金予定額
      actualDepositDate    : "",  // 実際入金日
      actualDepositAmount  : "",  // 実際入金額

    }],   // 入金記録
    status             : "",   // 回収ステータス
    statement          : [],
  },
  supplier : {
    open             : false,
    rows             : [],

    supplierId       : "",
    createAt         : "",
    updateAt         : "",

    supTemporaryName : "",
    supplierName     : "",
    supplierAddress  : "",
    supplierPostCode : "",
    supplierPhone    : "",
    supplierEmail    : "",
    supplierMobile   : "",
    supplierInCharge : "",
    payoutPeriod     : 1, //回収サイクル
    existence        : true, // 有効か否か
  },
  products : {
    rows              : [],

    productId         : "",
    productName       : "",
    proNickname       : "",
    supplierId        : "",
    supplierName      : "",
    supBranchName     : "",
    defaultUnitPrice  : "",
    unitPrice_01      : "",
    unitPrice_02      : "",
    unitPrice_03      : "",
    unitPrice_04      : "",
    unitPrice_05      : "",
    unit              : "",   // 単位
    classification_01 : "",
    classification_02 : "",
    classification_03 : "",
    classification_04 : "",
    classification_05 : "",
    classification_06 : "",
    classification_07 : "",
    classification_08 : "",
    classification_09 : "",
    classification_10 : "",
    existence         : true, // 有効か否か
    createAt          : "", // 作成日時
    updateAt          : "", // 更新日時
  },
  users : {

    organizationId: "",
    email: "",
    isSignedIn: false,
    orders: [],
    payment_method_id: "",
    role: "",
    userId: "",
    userName: "",
  }
}

export default initialState;