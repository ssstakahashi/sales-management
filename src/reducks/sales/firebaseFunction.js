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
  console.log(salesData)
  return salesData
}