import { db } from "../../firebase";


const accountingRef = db.collection('organization')

export const AccountingCreate = ( inputData, id, organizationId ) => {

  accountingRef.doc(organizationId).collection('accountings').doc( id ).set( inputData,{ merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
}

export const AccountingDataGet = async(organizationId) => {
  let AccountingData = []
  await accountingRef.doc(organizationId).collection('accountings').get()
    .then( querySnapshot => {
      querySnapshot.forEach( doc => {
        AccountingData.push(doc.data())
      });
    })
  return AccountingData
}

export const AccountingDatabase = (x) => {
  return {
    createAt             : x.createAt,
    updateAt             : x.updateAt,
    accountingId         : x.accountingId,  // 仕訳ID
  }
}