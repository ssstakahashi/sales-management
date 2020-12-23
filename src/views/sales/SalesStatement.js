import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router'
import { amountChange, salesInputOperation } from '../../reducks/sales/operations';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { DateInput, MainButton, TextInput, SwitchInput, SelectInput } from '../../components/uikit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Typography } from '@material-ui/core';


const SalesStatement = ({ x, index, TotalAmountCalc }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state.sales);

    const [ productName, setProductName ]               = useState({ [index]: x.productName})         // 商品名
    const [ price, setPrice ]                           = useState({ [index]: x.price})               // 単価
    const [ quantity, setQuantity ]                     = useState({ [index]: x.quantity})            // 数量
    const [ unit, setUnit ]                             = useState({ [index]: x.unit})                // 単価
    const [ amount, setAmount ]                         = useState({ [index]: x.amount})              // 金額

    const inputProductName         = useCallback(e => setProductName({...productName, [index]: e.target.value }),[productName])
    const inputPrice               = useCallback(e => setPrice({ ...price, [index]: e.target.value }),[price])
    const inputQuantity            = useCallback(e => setQuantity({ ...quantity, [index]: e.target.value }),[quantity])
    const inputUnit                = useCallback(e => setUnit({ ...unit, [index]: e.target.value }),[unit])
    // const inputAmount              = useCallback(e => setAmount(e.target.value),[amount])

    const selectUnit = [{id: "001", name: "人月"}, { id: "002", name: "時間"}, { id: "003", name: "件"} ]

    useEffect(()=>{
        calcTotalAmount()
    },[ price[index], quantity[index] ])

    function calcTotalAmount () {
        // const Rows = selector.statement
        const total = parseInt( price[index] * quantity[index] )
        // const state = { productName, price, quantity, unit, amount: total }
        // Rows.push(state)
        setAmount({ ...amount, [index]: total})
        // TotalAmountCalc(Rows)
        // dispatch( amountChange(state))
    }


    return (
        <div className={classes.container}>
            <div>
              <TextInput label={"商品名"} fullWidth={false} required={true} value={productName[index]} name="productName" onChange={inputProductName} />
            </div>
            <div>
              <TextInput label={"単価"} fullWidth={false} required={false} value={price[index]} name="price" onChange={inputPrice} type="number"/>
            </div>
            <div>
              <TextInput label={"数量"} fullWidth={false} required={false} value={quantity[index]} name="quantity" onChange={inputQuantity} type="number"/>
            </div>
            <div>
              <SelectInput label={"単位"} value={unit[index]} selectArray={selectUnit} selectValue={"id"} selectList={"name"} onChange={inputUnit}/>
            </div>
            <div className={classes.underLine}>
    
              <Typography className={classes.underLIneText}>{`金額： ${amount[index].toLocaleString()} 円`}</Typography>

            </div>
        </div>
    )
}

export default SalesStatement;

const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
      display : "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems : "end",
    },
    underLine: {
      position: "relative",
      height: "50px",
      width: "250px",

    },
    underLIneText: {
        position: "absolute",
        bottom: 0,
        margin: "0 3rem",
        padding: 0,
    },
  }));