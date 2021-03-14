import { db } from "../../firebase";

const supplierRef = db.collection('organization')

export const SupplierCreate = ( inputData, id, organizationId ) => {
  supplierRef.doc(organizationId).collection('supplier').doc(id).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

export const SupplierDataGet = async(organizationId) => {
  let supplierData = []
  await supplierRef.doc(organizationId).collection('supplier').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          supplierData.push(doc.data())
      })
    })
  return supplierData
}