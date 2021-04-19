import { db } from "../../firebase";

const productRef = db.collection('organization')

export const productCreate = ( inputData, id, organizationId ) => {
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
        productData.push({...doc.data(), productId: doc.id })
      });
    })
  return productData
}


export const ProductDatabase = (x) => ({
  productId         : x.productId, // docId
  existence         : x.existence, // 有効か否か
  createAt          : x.createAt, // 作成日時
  updateAt          : x.updateAt, // 更新日時
  userId            : x.userId,

  productName       : x.productName,
  proNickname       : x.proNickname,
  supplierId        : x.supplierId,
  supplierName      : x.supplierName,
  supBranchName     : x.supBranchName,
  inventoryControl  : x.inventoryControl,
  salesProduct      : x.salesProduct,
  defaultUnitPrice  : x.defaultUnitPrice,
  unitPrice_01      : x.unitPrice_01,
  unitPrice_02      : x.unitPrice_02,
  unitPrice_03      : x.unitPrice_03,
  unitPrice_04      : x.unitPrice_04,
  unitPrice_05      : x.unitPrice_05,
  tax_01            : x.tax_01,
  tax_02            : x.tax_02,
  tax_03            : x.tax_03,
  tax_04            : x.tax_04,
  tax_05            : x.tax_05,
  unitPriceIn_01    : x.unitPriceIn_01,
  unitPriceIn_02    : x.unitPriceIn_02,
  unitPriceIn_03    : x.unitPriceIn_03,
  unitPriceIn_04    : x.unitPriceIn_04,
  unitPriceIn_05    : x.unitPriceIn_05,
  unit              : x.unit,   // 単位
  classification_01 : x.classification_01,
  classification_02 : x.classification_02,
  classification_03 : x.classification_03,
  classification_04 : x.classification_04,
  classification_05 : x.classification_05,
  classification_06 : x.classification_06,
  classification_07 : x.classification_07,
  classification_08 : x.classification_08,
  classification_09 : x.classification_09,
  classification_10 : x.classification_10,

})