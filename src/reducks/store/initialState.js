const initialState = {
  sales : {
    createAt     : new Date(),
    updateAt     : new Date(),
    salesDay     : "",
    customerName : "",
    amount       : "",
    // proId     : salesData.proId,
    proName      : "",
    userId       : "",
  },
  supplier : {
    createAt         : new Date(),
    updateAt         : new Date(),
    supplierName     : "",
    supplierAddress  : "",
    supplierId       : "",
    supplierPhone    : "",
    supplierMobile   : "",
    supplierInCharge : "",
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