import { db } from "../../firebase";

const collectionRef = db.collection('organization')

export const CollectionCreate = ( inputData, id, organizationId ) => {

  collectionRef.doc(organizationId).collection('collections').doc( id ).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

export const CollectionDataGet = async(organizationId) => {
  let collectionData = []
  await collectionRef.doc(organizationId).collection('collections').get()
    .then( querySnapshot => {
      querySnapshot.forEach( doc => {
        collectionData.push(doc.data())
      });
    })
  return collectionData
}

export const CollectionDatabase = (x) => {
  return {
    createAt             : x.createAt,
    updateAt             : x.updateAt,
    installmentPayment   : x.installmentPayment,   // 回収回数
    plannedTotalAmount   : x.plannedTotalAmount,   // 入金予定総額
    actualTotalAmount    : x.actualTotalAmount,   // 入金総額
    collectionStatus     : x.collectionStatus,
    collectionDone       : x.collectionDone,  // 入金済みか否か
    plannedDepositDate   : x.plannedDepositDate,  // 入金予定日(売上時点)
    plannedDepositAmount : x.actualDepositAmount,  // 入金予定額
    actualDepositDate    : x.actualDepositDate,  // 実際入金日
    actualDepositAmount  : x.actualDepositAmount,  // 実際入金額
    serialPaymentNumber  : x.serialPaymentNumber,
    salesId              : x.salesId,  // 販売データID
    collectionId         : x.collectionId,  // 請求データID
  }
}