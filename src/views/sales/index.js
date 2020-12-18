import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router'
import { salesInputOperation } from '../../reducks/sales/operations';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { DateInput, MainButton, TextInput } from '../../components/uikit';

const Sales = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state.sales);
  const [ salesDay, setSalesDay ] = useState(selector.salesDay)
  const [ salesSubject, setSalesSubject ] = useState(selector.salesSubject)
  const [ salesDescription, setSalesDescription ] = useState(selector.salesDescription)

  const inputSalesDay = useCallback((e) => {
    setSalesDay(e.target.value)
    },[salesDay])
  const inputSalesSubject = useCallback((e)=>{
    setSalesSubject(e.target.value)
  },[salesSubject])
  const inputSalesDescription = useCallback((e)=>{
    setSalesDescription(e.target.value)
  },[salesDescription])

  const submitDispatch = () => {
    const state = { salesDay, salesSubject, salesDescription}
    dispatch(salesInputOperation(state))
  }

  return (
    <form className={classes.root} autoComplete="off">
      <div>
        <div>
          <DateInput
            label={"売上日"}
            fullWidth={true}
            required={true}
            value={salesDay}
            name="salesDay"
            onChange={inputSalesDay}
          />
        </div>
        {/* <div>
          <TextInput
            label={"取引先"}
            fullWidth={true}
            multiline={false}
            required={true}
            rows={1}
            value={state.supplierName}
            name="supplierName"
            type={"text"}
            onChange={inputSalesDay}
          />
        </div> */}
        <div>
          <TextInput
            label={"salesSubject"}
            fullWidth={true}
            multiline={false}
            required={false}
            rows={1}
            value={salesSubject}
            name="salesSubject"
            type={"text"}
            onChange={inputSalesSubject}
          />
        </div>
        <div>
          <TextInput
            label={"salesDescription"}
            fullWidth={true}
            multiline={true}
            required={false}
            rows={1}
            value={salesDescription}
            name="salesDescription"
            type={"text"}
            onChange={inputSalesDescription}
          />
        </div>
        {/* <div>
          <TextInput
            label={"salesDescription"}
            fullWidth={true}
            multiline={true}
            required={false}
            rows={1}
            value={state.salesDescription}
            name="salesDescription"
            type={"text"}
            onChange={inputSalesDescription}
          />
        </div> */}

      </div>

      <div className={classes.center}>
        <MainButton label={"登録"} color="primary" onClick={submitDispatch} />
      </div>
      <div className={classes.center}>
        <MainButton label={"戻る"} color="secondary" onClick={()=>dispatch(push('/'))}/>
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

export default Sales;