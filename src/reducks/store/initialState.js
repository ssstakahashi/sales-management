const initialState = {
  sales : {
    createAt           : "",
    updateAt           : "",
    salesSerialNumber  : "",  // シリアルナンバー
    salesDay           : "",　// 売上日
    supplierName       : "",　// 取引先名
    supplierId     　  : "",　// 取引先ID
    salesAmount        : "",  // 売上合計(税抜)
    salesSubject       : "",　// 件名
    salesDescription   : "",  // 摘要
    userId             : "",
    existence          : true, // 有効か否か
    taxIncluded      　: true, // 税込み＝True 税抜き=false
    tax10 　　　　　　  : "",   // 10%対象額
    tax08              : "",   //  8%対象額
    consumptionTax     : "",　 // 消費税額
    plannedDepositDate : "",  // 入金予定日(売上時点)
    statement          : [],
  },
  salesDetails  : {
    productId   : "",　// 商品ID
    productName : "",　// 商品名
    price       : "",  // 単価
    quantity    : "",  // 数量
    unit        : "",  // 単位
    amount      : "",  // 金額

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
    payoutPeriod     : "", //回収サイクル
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