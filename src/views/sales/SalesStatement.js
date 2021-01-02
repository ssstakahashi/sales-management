import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { statementPush } from '../../reducks/sales/operations';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, SelectInput } from '../../components/uikit';
import { Typography } from '@material-ui/core';
import { selectUnit } from '../../reducks/store/fixedData';


const SalesStatement = ({ x, index, taxIncluded }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [ productName, setProductName ]               = useState(x.productName)         // 商品名
  const [ price, setPrice ]                           = useState(x.price)               // 単価
  const [ quantity, setQuantity ]                     = useState(x.quantity)            // 数量
  const [ unit, setUnit ]                             = useState(x.unit)                // 単価
  const [ amount, setAmount ]                         = useState(x.amount)              // 金額
  console.log(productName, price, quantity, unit, amount)

  const inputProductName         = useCallback(e => setProductName(e.target.value),[productName])
  const inputPrice               = useCallback(e => setPrice(parseInt(e.target.value) ),[price])
  const inputQuantity            = useCallback(e => setQuantity(parseInt(e.target.value)),[quantity])
  const inputUnit                = useCallback(e => setUnit(e.target.value),[unit])
  // const inputAmount              = useCallback(e => setAmount(e.target.value),[amount])


  useEffect(()=>{
      const amount = calcTotalAmount()
      dispatch( statementPush({ statementNo: index + 1, productName, price, quantity, unit, amount}, taxIncluded))
  },[ price, quantity, taxIncluded ])

  function calcTotalAmount () {
      const total = parseInt( price * quantity)
      setAmount(total)
      return total
  }


  return (
      <div className={classes.container}>
          <div>
            <TextInput label={"商品名"} fullWidth={false} required={true} value={productName} name="productName" onChange={inputProductName} />
          </div>
          <div>
            <TextInput label={"単価"} fullWidth={false} required={false} value={price} name="price" onChange={inputPrice} type="number"/>
          </div>
          <div>
            <TextInput label={"数量"} fullWidth={false} required={false} value={quantity} name="quantity" onChange={inputQuantity} type="number"/>
          </div>
          <div>
            <SelectInput label={"単位"} value={unit} selectArray={selectUnit} selectValue={"id"} selectList={"name"} onChange={inputUnit}/>
          </div>
          <div className={classes.underLine}>
            <Typography className={classes.underLIneText}>{`金額： ${amount.toLocaleString()} 円`}</Typography>

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