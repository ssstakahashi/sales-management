import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router'
import { supplierInputOperation } from '../../reducks/supplier/operations';
import { makeStyles } from '@material-ui/core/styles';
import { MainButton, TextInput } from '../../components/uikit';
import SelectInput from '@material-ui/core/Select/SelectInput';

const SupplierEntry = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state.supplier);

  console.log(selector)
  
  const [ supTemporaryName, setSupTemporaryName ] = useState(selector.supTemporaryName) 
  const [ supplierName,     setSupplierName ]     = useState(selector.supplierName) 
  const [ supplierAddress,  setSupplierAddress ]  = useState(selector.supplierAddress) 
  const [ supplierPostCode, setSupplierPostCode ] = useState(selector.supplierPostCode) 
  const [ supplierPhone,    setSupplierPhone ]    = useState(selector.supplierPhone) 
  const [ supplierEmail,    setSupplierEmail ]    = useState(selector.supplierEmail) 
  const [ supplierInCharge, setSupplierInCharge ] = useState(selector.supplierInCharge) 
  const [ supplierMobile,   setSupplierMobile ]   = useState(selector.supplierMobile) 
  const [ payoutPeriod,     setPayoutPeriod ]     = useState(selector.payoutPeriod) 

  const inputSupTemporaryName = useCallback((e) => setSupTemporaryName(e.target.value),[supTemporaryName])
  const inputSupplierName     = useCallback((e) => setSupplierName(e.target.value),    [supplierName])
  const inputSupplierAddress  = useCallback((e) => setSupplierAddress(e.target.value), [supplierAddress])
  const inputSupplierPostCode = useCallback((e) => setSupplierPostCode(e.target.value),[supplierPostCode])
  const inputSupplierPhone    = useCallback((e) => setSupplierPhone(e.target.value),   [supplierPhone])
  const inputSupplierEmail    = useCallback((e) => setSupplierEmail(e.target.value),   [supplierEmail])
  const inputSupplierInCharge = useCallback((e) => setSupplierInCharge(e.target.value),[supplierInCharge])
  const inputSupplierMobile   = useCallback((e) => setSupplierMobile(e.target.value),  [supplierMobile])
  const inputPayoutPeriod     = useCallback((e) => setPayoutPeriod(e.target.value),    [payoutPeriod])

  const PayoutPeriodList = [
    { id : 0, title: "当日" }, { id : 1, title: "翌日" }, { id : 7, title: "翌週" }, { id : 31, title: "当月末" }, { id: 40, title: "翌月10日" }, { id : 60, title: "翌月末" }, 
  ]

  const createSupplier = () => {
    const state = {
      ...selector,
      supTemporaryName,
      supplierName,
      supplierAddress,
      supplierPostCode,
      supplierPhone,
      supplierEmail,
      supplierInCharge,
    }
    dispatch(supplierInputOperation(state))
  }

  return (
    <form className={classes.root}>
      <div>
        <div>
          <TextInput
            label={"通称"}
            fullWidth={true}
            multiline={false}
            required={true}
            rows={1}
            value={supTemporaryName}
            name="supTemporaryName"
            autoComplete="off"
            type={"text"}
            onChange={inputSupTemporaryName}
          />
        </div>
        <div>
          <TextInput
            label={"取引先"}
            fullWidth={true}
            multiline={false}
            required={false}
            rows={1}
            value={supplierName}
            name="supplierName"
            autoComplete="off"
            type={"text"}
            onChange={inputSupplierName}
          />
        </div>
        <div>
          <TextInput
            label={"郵便番号"}
            fullWidth={true}
            multiline={false}
            required={true}
            rows={1}
            value={supplierPostCode}
            name="postal-code"
            autoComplete="postal-code"
            type={"text"}
            onChange={inputSupplierPostCode}
          />
        </div>
        <div>     
          <TextInput
            label={"所在地"}
            fullWidth={true}
            multiline={false}
            required={false}
            rows={1}
            value={supplierAddress}
            name="supplierAddress"
            autoComplete="off"
            type={"text"}
            onChange={inputSupplierAddress}
          />
        </div>
        <div>
          <TextInput
            label={"電話番号"}
            fullWidth={true}
            multiline={false}
            required={false}
            rows={1}
            value={supplierPhone}
            name="supplierPhone"
            autoComplete="tel-area-code"
            type={"tel"}
            onChange={inputSupplierPhone}
          />
        </div>
        <div>
          <TextInput
            label={"Email"}
            fullWidth={true}
            multiline={false}
            required={false}
            rows={1}
            value={supplierEmail}
            name="supplierEmail"
            autoComplete="email"
            type={"email"}
            onChange={inputSupplierEmail}
          />
        </div>
        <div>
          <TextInput
            label={"担当者"}
            fullWidth={true}
            multiline={false}
            required={false}
            rows={1}
            value={supplierInCharge}
            name="supplierInCharge"
            autoComplete="name"
            type={"text"}
            onChange={inputSupplierInCharge}
          />
        </div>
        <div>
          <TextInput
            label={"携帯"}
            fullWidth={true}
            multiline={false}
            required={false}
            rows={1}
            value={supplierMobile}
            name="supplierPhone"
            autoComplete="tel-area-code"
            type={"tel"}
            onChange={inputSupplierMobile}
          />
        </div>
        <div>
          <SelectInput label={"回収サイクル"} onChange={inputPayoutPeriod} value={payoutPeriod} selectArray={PayoutPeriodList} selectValue={"id"} selectList={"title"}/>
        </div>

      </div>
      <div className={classes.center}>
        <MainButton label={"登録"} color="primary" onClick={createSupplier} />
      </div>
      <div className={classes.center}>
        <MainButton label={"戻る"} color="secondary" onClick={props.handleClose}/>
      </div>
  
    </form>
  )
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    maxWidth: "400px",
    padding: "1rem",
    height: "auto",
    width: "calc(100% - 2rem)",
  },
  center : {
    margin: "0 auto",
    textAlign: "center",
  }
}));

export default SupplierEntry;