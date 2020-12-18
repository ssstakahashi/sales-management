import { db } from "../../firebase";

const supplierRef = db.collection('supplier')

export const supplierCreate = ( inputData, id ) => {
  console.log(inputData)
  supplierRef.doc( id ).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

export const supplierDataGet = async() => {
  let supplierData = []
  await supplierRef.get()
    .then( querySnapshot => {
      querySnapshot.forEach( doc => {
          console.log(doc.id, " => ", doc.data());
          supplierData.push({...doc.data(), docId: doc.id })
      });
    })
  return supplierData
}