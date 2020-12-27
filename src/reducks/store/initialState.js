const initialState = {
  sales : {
    open             : false,
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
  },
  users : {
    cart: [],
    customer_id: "",
    email: "",
    isSignedIn: false,
    orders: [],
    payment_method_id: "",
    role: "",
    uid: "",
    username: ""
  }
}

export default initialState;