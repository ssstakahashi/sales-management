const initialState = {
  accountings : {
    rows : [],
    maxNumber : "", // 仕訳番号の一番大きい数字

    accountingId : "",   // 会計Id
    journalNumber : "", // 仕訳番号
    journalDate   : "", // 仕訳日
    createAt      : "",
    updateAt      : "",
    exsist        : true,
    route         : "",
    projectCode   : "",
    userId        : "",

    statement     : [{
      journalCode : "", // 仕訳明細番号（journalNumberに2桁番号を付与）
      description  : "",   // 摘要
      debitAccount : "",  // 勘定科目（借方）
      debitAmount : "", // 金額（借方）
      debitTax    : "", // 税金（借方）
      debitSupplierId : "", // 取引先Id（借方）
      debitSupTemporaryName : "", // 取引先名（借方、暫定・短縮版）
      debitItems : "",  // 品目（借方）
      debitMemo : [], // メモ（借方）
      debitDepartment : "", // 部門（借方）

      creditAccount : "",  // 勘定科目（貸方）
      creditAmount : "", // 金額（貸方）
      creditTax    : "", // 税金（貸方）
      creditSupplierId : "", // 取引先Id（貸方）
      creditSupTemporaryName : "", // 取引先名（貸方、暫定・短縮版）
      creditItems : "", // 品目（貸方）
      creditMemo : [],  // メモ（貸方）
      creditDepartment : "",  // 部門（貸方）
    }]
  },

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
    totalAmount        : 0,  // 売上合計
    billingAmount      : 0,  // 請求合計
    salesSubject       : "",　// 件名
    salesDescription   : "",  // 摘要
    salesEntity        : "",  // 売上主体（個人事業主としてか？法人としてか？）
    userId             : "",
    salesId            : "",  // salesId
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

    status             : "",   // 回収ステータス
    statement          : [],
  },
  collections: {
    rows                 : [],

    createAt             : "",
    updateAt             : "",
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
  },
  payments: {
    rows: [],
  },
  suppliers : {
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
  },
  dialogs : {
    accountings : false,
    sales       : false,
    collections : false,
    payments    : false,
    suppliers   : false,

  },
  reports : {

  },
}

export default initialState;