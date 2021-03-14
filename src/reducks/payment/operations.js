import { PaymentInputAction } from './actions';
import { PaymentDataGet, PaymentCreate } from './firebaseFunction';
import { db } from '../../firebase';
import _ from 'lodash';

const paymentRef = db.collection('organization')
const timeStamp = new Date()

export const PaymentInputOperation = ( data ) => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId

    let id = "";
    if ( !data.paymentId ) {
      const ref = paymentRef.doc(organizationId).collection('payments').doc();
      id  = ref.id
    }
    const inputData = {
      paymentId         : data.paymentId || id,
      paymentName       : data.paymentName,
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
    PaymentCreate( inputData, id, organizationId )
    let arrayRows = await data.rows
    arrayRows.unshift({ ...inputData, docId : id })
    const Rows = await _.orderBy( _.uniqBy( arrayRows, 'docId'),  ['createAt'], ['desc'] )

    dispatch( PaymentInputAction({
      ...inputData,
      rows : Rows,
    }))
  }
}

export const PaymentDataGetOperation = () => {
  return async( dispatch, getState ) => {
    const state = getState()
    const organizationId = state.users.organizationId
    const getData = await PaymentDataGet(organizationId).then((res)=>{
      return res
    });
    const paymentData = await {
        ...state.payments,
        rows : getData,
    }
    dispatch( PaymentInputAction(paymentData) )
  }
}