import { db } from "../../firebase";

const productRef = db.collection('organization')

export const productCreate = ( inputData, id, organizationId ) => {
  console.log(inputData)
  productRef.doc(organizationId).collection('products').doc( id ).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

export const productDataGet = async(organizationId) => {
  let productData = []
  await productRef.doc(organizationId).collection('products').get()
    .then( querySnapshot => {
      querySnapshot.forEach( doc => {
        productData.push({...doc.data(), docId: doc.id })
      });
    })
  return productData
}