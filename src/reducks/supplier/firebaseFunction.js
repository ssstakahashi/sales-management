import { db } from "../../firebase";

const supplierRef = db.collection('organization')

export const SupplierCreate = ( inputData, id, organizationId ) => {
  supplierRef.doc(organizationId).collection('suppliers').doc(id).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

export const SupplierDataGet = async(organizationId) => {
  let supplierData = []
  await supplierRef.doc(organizationId).collection('suppliers').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          supplierData.push(doc.data())
      })
    })
  return supplierData
}

export const SupplierFirebaseDatabase = (x) => ({
    supplierId       : x.supplierId,
    createAt         : x.createAt,
    updateAt         : x.updateAt,
    userId           : x.userId,

    supTemporaryName : x.supTemporaryName,
    supplierName     : x.supplierName,
    supplierAddress  : x.supplierAddress,
    supplierPostCode : x.supplierPostCode,
    supplierPhone    : x.supplierPhone,
    supplierEmail    : x.supplierEmail,
    supplierMobile   : x.supplierMobile,
    supplierInCharge : x.supplierInCharge,
    payoutPeriod     : x.payoutPeriod, //回収サイクル
    myself           : x.myself, // 自分の法人か否か
    existence        : x.existence, // 有効か否か
})