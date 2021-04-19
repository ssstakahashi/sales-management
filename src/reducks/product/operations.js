import { ProductInputAction } from './actions';
import initialState from '../store/initialState';
import { productDataGet, productCreate, ProductDatabase } from './firebaseFunction';
import { db, firebaseTimestamp } from '../../firebase';
import _ from 'lodash';
import { getUserId } from '../users/selectors';

const productRef = db.collection('organization')
const timeStamp = firebaseTimestamp.now()

export const productInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    let arrayRows = state.products.rows
    const organizationId = state.users.organizationId
    const userId = getUserId(state)
    let id = "";
    let inputData = {
      ...ProductDatabase(data),
      productId  : data.productId || id,
      existence  : true, // 有効か否か
      createAt   : data.createAt ? data.createAt : timeStamp,
      updateAt   : timeStamp,
      userId,
    }
    if ( !data.productId ) {
      // データの新規作成
      const ref = productRef.doc(organizationId).collection('products').doc();
      id  = ref.id
      inputData = { ...inputData, productId : id }
      arrayRows.unshift(inputData)
    } else {
      // データの更新
      id = data.productId
      const arrayIndex = _.findIndex( arrayRows, ['productId', id ]);
      arrayRows.splice( arrayIndex, 1, inputData)
    }

    productCreate( inputData, id, organizationId )
    arrayRows = _.orderBy( arrayRows, ['createAt'], ['desc'] )
    dispatch( ProductInputAction({ ...inputData, rows : arrayRows, }) )
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