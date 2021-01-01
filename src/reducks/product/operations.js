import { ProductInputAction } from './actions';
import initialState from '../store/initialState';
import { productDataGet, productCreate } from './firebaseFunction';
import { db, firebaseTimestamp } from '../../firebase';
import _ from 'lodash';

const productRef = db.collection('organization')

export const productInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const timeStamp = firebaseTimestamp.now()
    let id = data.docId || "";
    if ( !data.docId ) {
      const ref = productRef.doc(organizationId).collection.doc('products');
      id  = ref.id
    }
    const productId = data.productId ? data.productId : id;
    // function getUniqueStr(strong){
    //   if (strong)
    //     return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    //  }
    const inputData = {
      productId,
      createAt         : data.createAt ? data.createAt : timeStamp,
      updateAt         : timeStamp,


    }
    productCreate( inputData, id, organizationId )
    let arrayRows = await state.products.rows
    console.log(arrayRows)
    arrayRows.unshift({ ...inputData, docId : id })
    const Rows = await _.orderBy( _.uniqBy( arrayRows, 'docId'),  ['createAt'], ['desc'] )

    dispatch( ProductInputAction({
      ...inputData,
      rows : Rows,
      open : false,
    }))
  }
}

export const productDialogOpenOperation = ( row ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row.open = true
    row.rows = state.products.rows
    dispatch( ProductInputAction( row ) )
  }
}

export const productDialogCloseOperation = ( row = {} ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    row = initialState.products
    row.open = false
    row.rows = state.products.rows
    dispatch( ProductInputAction({
        ...row,
      }))
  }
}

export const productDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    console.log("テスト", state)
    const getData = await productDataGet().then((res)=>{
      console.log(res)
      return res
    });
    const productData = await {
        ...state.products,
        rows : getData,
    }
    dispatch( ProductInputAction(productData) )
  }
}