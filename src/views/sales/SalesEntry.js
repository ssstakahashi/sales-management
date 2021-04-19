import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SalesInputOperation, StatementPush } from '../../reducks/sales/operations';
import { makeStyles } from '@material-ui/core/styles';
import { DateInput, MainButton, TextInput, SwitchInput, SelectInput } from '../../components/uikit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Grid, Paper, Typography } from '@material-ui/core';
import SalesStatement from './SalesStatement';
import Confirmation from './Confirmation';

import _ from 'lodash';

const SalesEntry = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const sales = selector.sales;
  const supplierRows = useMemo(()=>selector.suppliers.rows,[])
  const selectEntity = useMemo(()=>supplierRows.filter( x => x.myself === true ),[])
  const Statement = _.uniqBy( sales.statement, 'statementNo')

  const billingAmount = selector.billingAmount

  const [ salesDay, setSalesDay ]                     = useState(sales.salesDay)            // 売上日
  // const [ supplierName, setSupplierName ]             = useState(selector.supplierName)     // 取引先名
  const [ supplierId, setSupplierId ]             = useState(sales.supplierId)              // 取引先ID
  const [ totalAmount, setTotalAmount ]               = useState(sales.totalAmount)         // 売上高合計
  const [ salesEntity, setSalesEntity ]               = useState(sales.salesEntity)         // 売上主体（個人事業主としてか？法人としてか？）
  const [ salesSubject, setSalesSubject ]             = useState(sales.salesSubject)        // 件名
  const [ salesDescription, setSalesDescription ]     = useState(sales.salesDescription)    // 摘要
  const [ taxIncluded, setTaxIncluded ]               = useState(sales.taxIncluded)         // 税込み＝True 税抜き=false
  const [ productName, setProductName ]               = useState(sales.productName)         // 商品名
  const [ price, setPrice ]                           = useState(sales.price)               // 単価
  const [ quantity, setQuantity ]                     = useState(sales.quantity)            // 数量
  const [ unit, setUnit ]                             = useState(sales.unit)                // 単価
  const [ amount, setAmount ]                         = useState(sales.amount)              // 単価
  const [ tax10, setTax10 ]                           = useState(sales.tax10)               // 10%対象額
  const [ tax08, setTax08 ]                           = useState(sales.tax08)               // 8%対象額
  const [ consumptionTax, setConsumptionTax ]         = useState(sales.consumptionTax)      // 消費税額


  const inputSalesDay            = useCallback(e => setSalesDay(e.target.value),[salesDay])
  const inputSupplierId          = useCallback(e => setSupplierId(e.target.value),[supplierId])
  const inputSalesEntity         = useCallback(e => setSalesEntity(e.target.value),[salesEntity])
  const inputSalesSubject        = useCallback(e => setSalesSubject(e.target.value),[salesSubject])
  const inputSalesDescription    = useCallback(e => setSalesDescription(e.target.value),[salesDescription])
  const inputTaxIncluded         = useCallback(e => setTaxIncluded(e.target.checked),[taxIncluded])
  // const inputProductName         = useCallback(e => setProductName(e.target.value),[productName])
  // const inputPrice               = useCallback(e => {
  //   setPrice(e.target.value)
  //   // calcTotalAmount()
  // },[price])
  // const inputQuantity            = useCallback(e => { 
  //   setQuantity(e.target.value)
  //   // calcTotalAmount()
  // },[quantity])
  // const inputUnit                = useCallback(e => setUnit(e.target.value),[unit])
  // // const inputAmount              = useCallback(e => setAmount(e.target.value),[amount])
  // const inputTax10               = useCallback(e => setTax10(e.target.value),[tax10])
  // const inputTax08               = useCallback(e => setTax08(e.target.value),[tax08])
  // const inputConsumptionTax      = useCallback(e => setConsumptionTax(e.target.value),[consumptionTax])

  const submitDispatch = () => {
    const state = { ...sales, salesDay, salesSubject, salesDescription, supplierId, salesEntity, taxIncluded, consumptionTax}
    props.handleClose()
    dispatch(SalesInputOperation(state))
  }

  const plusStatement = (remove) => {
    const statement = {
      statementNo : !remove ? "" : sales.statement[sales.statement.length - 1].statementNo,
      productName : "",
      productId   : "",
      price       :  0,
      quantity    :  0,
      unit        : "",
      amount      :  0,
      remarks     : "",
    }
    if ( !remove ) {
      dispatch( StatementPush( statement, taxIncluded, remove) )
    } else {
      if ( Statement.length >= 2  ) dispatch( StatementPush( statement, taxIncluded, remove) )
    }

  }

  return (
    <form className={classes.root}>
        <Grid container direction="column" justiry="cneter" aliginItems="flex-start" spacing={2}>
    
            <Grid item>
              <TextInput label={"件名"} fullWidth={true} required={true} value={salesSubject} name="salesSubject" onChange={inputSalesSubject} />
            </Grid>

            <Grid item container direction="row" justify="flex-start" alignItems="cneter" spacing={5}>
              
                <Grid item>
                  <DateInput label={"売上日"} required={true} value={salesDay} name="salesDay" onChange={inputSalesDay} />
                </Grid>

                <Grid item>
                    <SelectInput label={"販売主体"} onChange={inputSalesEntity}
                      value={salesEntity} selectArray={selectEntity}
                      selectValue={"supplierId"} selectList={"supplierName"} />
                </Grid>
                <Grid item>
                    <SelectInput label={"取引先"} onChange={inputSupplierId}
                      value={supplierId} selectArray={supplierRows}
                      selectValue={"supplierId"} selectList={"supplierName"}
                    />
                </Grid>
                <Grid item style={{paddingTop: 0}}>
                    <TextInput label={"摘要"} fullWidth={true} value={salesDescription}
                      name="salesDescription" onChange={inputSalesDescription} multiline={true}
                      variant="outlined" rows={4}
                    />
                </Grid>

            </Grid>
      

            <Grid item container direction="row" justify={"flex-start"} alignItems="center">
                <Grid item xs={2}>
                  <Typography variant={"h5"}>明細</Typography>
                </Grid>
                <Grid item xs={2}>
                  <SwitchInput label={"税込"} value={taxIncluded} name="taxIncluded" onChange={inputTaxIncluded} color={"secondary"}/>
              </Grid>
            </Grid>

            <Grid item container direction="column" spacing={3} component={Paper} className={classes.paper}>
              <Grid item container direction="row" justify="flex-start" alignItems="flex-end" spacing={5}>
                  
                  <Grid item>
                      <Typography variant={"h6"}>{`売上高： ${sales.totalAmount.toLocaleString()} 円`}</Typography>
                  </Grid>
                  <Grid item>
                      <Typography variant={"h6"}>{`消費税額： ${sales.consumptionTax.toLocaleString()} 円`}</Typography>
                  </Grid>
                  <Grid item>
                      <Typography variant={"h6"}>{`請求額： ${Number(billingAmount).toLocaleString()} 円`}</Typography>
                  </Grid>

                  {/* <TableBody className={classes.container}> */}
                  {Statement.map(( x, index) => <SalesStatement key={index} x={x} index={index} taxIncluded={taxIncluded} /> )}
                  {/* </TableBody> */}

                <Grid item container direction="row" justify="center" alignItems="center" style={{padding: 0}}>
                  <Grid item>
                    <AddCircleIcon color="primary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>plusStatement(false)}/>
                  </Grid>
                  <Grid item>
                    <RemoveCircleIcon color="secondary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>plusStatement(true)}/>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>

            <Grid item container direction="column" justify="space-around" alignItems="cneter" spacing={3} style={{ marginTop: "2rem"}}>
              
              <Grid item style={{ textAlign: "center"}}>
                <MainButton label={"戻る"} color="secondary" onClick={props.handleClose}/>
              </Grid>
              <Grid item style={{ textAlign: "center"}}>
                <MainButton label={"登録"} color="primary" onClick={submitDispatch} />
              </Grid>

            </Grid>

        </Grid>

          <Confirmation handleClose={props.handleClose} submitDispatch={submitDispatch}/>
    </form>
  )
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: "1rem",
    height: "auto",
    width: "90%",
  },

  paper: {
    width: "100%",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: theme.palette.grey[50],
  },

}));

export default SalesEntry;

/* <Typography>{`10%対象額： ${tax10.toLocaleString()} 円`}</Typography> */
/* <TextInput label={"金額"} fullWidth={false} required={true} value={amount} name="amount" onChange={inputAmount} type="number"/> */

/* <TextInput label={"10%対象額"} fullWidth={false} required={true} value={} name="tax10" onChange={inputTax10} type="number"/> */
/* <TextInput label={"8%対象額"} fullWidth={false} required={true} value={tax08} name="tax08" onChange={inputTax08} type="number"/> */
/* <TextInput label={"消費税額"} fullWidth={false} required={true} value={consumptionTax} name="consumptionTax" onChange={inputConsumptionTax} type="number"/> */