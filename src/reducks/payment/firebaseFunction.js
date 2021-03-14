import { db } from "../../firebase";

const paymentRef = db.collection('organization')

export const PaymentCreate = ( inputData, id, organizationId ) => {
  paymentRef.doc(organizationId).collection('payments').doc( id ).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

export const PaymentDataGet = async(organizationId) => {
  let paymentData = []
  await paymentRef.doc(organizationId).collection('payments').get()
    .then( querySnapshot => {
      querySnapshot.forEach( doc => {
        paymentData.push(doc.data())
      });
    })
  return paymentData
}