import { ProductInputAction } from './actions';
import initialState from '../store/initialState';
import { productDataGet, productCreate } from './firebaseFunction';
import { db, firebaseTimestamp } from '../../firebase';
import _ from 'lodash';

const productRef = db.collection('organization')

export const productInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    console.log(data)
    const state = getState()
    const organizationId = state.users.organizationId
    const timeStamp = firebaseTimestamp.now()
    let id = "";
    if ( !data.productId ) {
      const ref = productRef.doc(organizationId).collection('products').doc();
      id  = ref.id
    }
    const inputData = {
      productId         : data.productId || id,
      productName       : data.productName,
      proNickname       : data.proNickname,
      supplierId        : data.supplierId || "",
      supplierName      : "",
      supBranchName     : "",
      defaultUnitPrice  : data.defaultUnitPrice,
      unitPrice_01      : data.unitPrice_01,
      unitPrice_02      : data.unitPrice_02,
      unitPrice_03      : data.unitPrice_03,
      unitPrice_04      : data.unitPrice_04,
      unitPrice_05      : data.unitPrice_05,
      unit              : data.unit,
      classification_01 : "",
      classification_02 : "",
      classification_03 : "",
      classification_04 : "",
      classification_05 : "",
      classification_06 : "",
      classification_07 : "",
      classification_08 : "",
      classification_09 : "",
      classification_10 : "",
      existence         : true, // 有効か否か

      createAt         : data.createAt ? data.createAt : timeStamp,
      updateAt         : timeStamp,
    }
    productCreate( inputData, id, organizationId )
    let arrayRows = await data.rows
    arrayRows.unshift({ ...inputData, docId : id })
    const Rows = await _.orderBy( _.uniqBy( arrayRows, 'docId'),  ['createAt'], ['desc'] )

    dispatch( ProductInputAction({
      ...inputData,
      rows : Rows,
    }))
  }
}

export const productDialogOpenOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row.rows = state.products.rows
    dispatch( ProductInputAction( row ) )
  }
}

export const productDialogCloseOperation = ( row = {} ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row = initialState.products
    row.rows = state.products.rows
    dispatch( ProductInputAction({
        ...row,
      }))
  }
}

export const productDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const getData = await productDataGet(organizationId).then((res)=>{
      return res
    });
    const productData = await {
        ...state.products,
        rows : getData,
    }
    dispatch( ProductInputAction(productData) )
  }
}