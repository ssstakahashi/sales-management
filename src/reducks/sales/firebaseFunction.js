import { db } from "../../firebase";

const salesRef = db.collection('sales')

export const salesCreate = ( inputData, id ) => {
  console.log(inputData)
  salesRef.doc( id ).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

export const salesDataGet = async() => {
  let salesData = []
  await salesRef.get()
    .then( querySnapshot => {
      querySnapshot.forEach( doc => {
          console.log(doc.id, " => ", doc.data());
          salesData.push({...doc.data(), docId: doc.id })
      });
    })
  return salesData
}