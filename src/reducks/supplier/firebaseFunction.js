import { db } from "../../firebase";

const supplierRef = db.collection('organization')

export const supplierCreate = ( inputData, id, organizationId ) => {
  console.log(inputData)
  supplierRef.doc(organizationId).collection('supplier').doc(id).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

export const supplierDataGet = async(organizationId) => {
  let supplierData = []
  await supplierRef.doc(organizationId).collection('supplier').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          supplierData.push({...doc.data(), docId: doc.id })
      })
    })
  console.log(supplierData)
  return supplierData
}