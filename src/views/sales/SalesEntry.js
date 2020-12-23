import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router'
import { salesInputOperation } from '../../reducks/sales/operations';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { DateInput, MainButton, TextInput, SwitchInput, SelectInput } from '../../components/uikit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Typography } from '@material-ui/core';
import SalesStatement from './SalesStatement';

const SalesEntry = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state.sales);
  console.log(selector)                                   
  const [ salesDay, setSalesDay ]                     = useState(selector.salesDay)            // 売上日
  const [ supplierName, setSupplierName ]             = useState(selector.supplierName)                             // 取引先名
  const [ totalAmount, setTotalAmount ]               = useState(selector.totalAmount)                             // 売上高合計
  const [ salesEntity, setSalesEntity ]               = useState(selector.salesEntity)                             // 売上主体（個人事業主としてか？法人としてか？）
  const [ salesSubject, setSalesSubject ]             = useState(selector.salesSubject)        // 件名
  const [ salesDescription, setSalesDescription ]     = useState(selector.salesDescription)    // 摘要
  const [ taxIncluded, setTaxIncluded ]               = useState(selector.taxIncluded)         // 税込み＝True 税抜き=false
  const [ productName, setProductName ]               = useState(selector.productName)         // 商品名
  const [ price, setPrice ]                           = useState(selector.price)               // 単価
  const [ quantity, setQuantity ]                     = useState(selector.quantity)            // 数量
  const [ unit, setUnit ]                             = useState(selector.unit)                // 単価
  const [ amount, setAmount ]                         = useState(selector.amount)              // 単価
  const [ tax10, setTax10 ]                           = useState(selector.tax10)               // 10%対象額
  const [ tax08, setTax08 ]                           = useState(selector.tax08)               // 8%対象額
  const [ consumptionTax, setConsumptionTax ]         = useState(selector.consumptionTax)   // 消費税額
  const [ installmentPayment, setInstallmentPayment ] = useState(selector.installmentPayment) // 回収回数

  const inputSalesDay            = useCallback(e => setSalesDay(e.target.value),[salesDay])
  const inputSupplierName        = useCallback(e => setSupplierName(e.target.value),[supplierName])
  const inputTotalAmount         = useCallback(e => setTotalAmount(e.target.value),[totalAmount])
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
  const inputTax10               = useCallback(e => setTax10(e.target.value),[tax10])
  // const inputTax08               = useCallback(e => setTax08(e.target.value),[tax08])
  // const inputConsumptionTax      = useCallback(e => setConsumptionTax(e.target.value),[consumptionTax])
  const inputInstallmentPayment  = useCallback(e => setInstallmentPayment(e.target.value),[installmentPayment])

  const submitDispatch = () => {
    const state = { salesDay, salesSubject, salesDescription}
    dispatch(salesInputOperation(state))
  }

// useEffect(()=>{
//   calcTotalAmount()
// },[ price, quantity ])

// function calcTotalAmount () {
//   let total = parseInt( price * quantity )
//   let consumptionTaxCalc = 0
//   setAmount(total)

//   if ( taxIncluded ) {
//     consumptionTaxCalc = parseInt(total / 1.1) 
//     setTax10( consumptionTaxCalc )
//     setConsumptionTax( total - consumptionTaxCalc )
//     setTotalAmount(total)
//   } else {
//     consumptionTaxCalc = total
//     let consumptionTax = parseInt(consumptionTaxCalc * 0.1)
//     setTax10( consumptionTaxCalc )
//     setConsumptionTax( consumptionTax )
//     setTotalAmount( consumptionTaxCalc + consumptionTax )
//   }
// }


  const selectEntity = [{id: "001", name: "高橋企画"}, { id: "002", name: "株式会社スタジオフーズ"} ]

  const TotalAmountCalc = (Rows) => {
    const statementRows = !Rows ? selector.statement : Rows
    const Reduce = statementRows.map( x => x.amount )
    const TotalAmount = Reduce.reduce( (accumulator, currentValue ) => {
      return accumulator + currentValue;
    });
    setTotalAmount(TotalAmount)
  }
  
  useEffect(()=>{
    TotalAmountCalc()
  },[totalAmount])


  return (
    <form className={classes.root}>
      <div>
        <div>
          <TextInput label={"件名"} fullWidth={true} required={true} value={salesSubject} name="salesSubject" onChange={inputSalesSubject} />
        </div>
        <div className={classes.container}>
          <div>
            <DateInput label={"売上日"} required={true} value={salesDay} name="salesDay" onChange={inputSalesDay} />
          </div>
          <div>
            <TextInput label={"取引相手"} fullWidth={false} required={true} value={supplierName} name="supplierName" onChange={inputSupplierName} />
          </div>
          <div>
          <Typography>{`売上高： ${totalAmount.toLocaleString()} 円`}</Typography>
    
          </div>
          <div>
          <Typography>{`消費税額： ${consumptionTax.toLocaleString()} 円`}</Typography>
          </div>
        </div>
          <div>
            <SelectInput label={"販売主体"} value={salesEntity} selectArray={selectEntity} selectValue={"id"} selectList={"name"} onChange={inputSalesEntity} />

            <SwitchInput label={"税込"} value={taxIncluded} name="taxIncluded" onChange={inputTaxIncluded} color={"primary"}/>
          </div>

        <div>
          <TextInput label={"摘要"} fullWidth={true} required={true} value={salesDescription} name="salesDescription" onChange={inputSalesDescription} multiline={true} rows={3}/>
        </div>

        <div>
          {selector.statement.map(( x, index) =>{
            return(
              <div key={index}>
                <SalesStatement x={x} index={index} TotalAmountCalc={TotalAmountCalc} />
              </div>
            )
          })}

 
          <Typography>{`10%対象額： ${tax10.toLocaleString()} 円`}</Typography>
          {/* <TextInput label={"金額"} fullWidth={false} required={true} value={amount} name="amount" onChange={inputAmount} type="number"/> */}
        </div>
        <div>
          {/* <TextInput label={"10%対象額"} fullWidth={false} required={true} value={} name="tax10" onChange={inputTax10} type="number"/> */}

          {/* <TextInput label={"8%対象額"} fullWidth={false} required={true} value={tax08} name="tax08" onChange={inputTax08} type="number"/> */}

          {/* <TextInput label={"消費税額"} fullWidth={false} required={true} value={consumptionTax} name="consumptionTax" onChange={inputConsumptionTax} type="number"/> */}
        </div>
        <div>
          <TextInput label={"分割回数"} fullWidth={false} required={true} value={installmentPayment} name="installmentPayment" onChange={inputInstallmentPayment} type="number"/>
        </div>
      </div>

      <AddCircleIcon color="primary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} />

      <div className={classes.center}>
        <MainButton label={"登録"} color="primary" onClick={submitDispatch} />
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
    maxWidth: "100%",
    padding: "1rem",
    height: "auto",
    width: "100%",
  },
  center : {
    margin: "0 auto",
    textAlign: "center",
  },
  container: {
    display : "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems : "end",
  },
}));

export default SalesEntry;