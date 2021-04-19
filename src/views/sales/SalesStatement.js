import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SalesInputOperation, SalesDataGetOperation, SalesDialogCloseOperation, SalesDialogOpenOperation, StatementPush } from '../../reducks/sales/operations';

import { makeStyles } from '@material-ui/core/styles';
import { TextInput, SelectInput } from '../../components/uikit';
import { Grid, TableBody, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import { selectUnit } from '../../reducks/store/fixedData';
import { productDataGetOperation } from '../../reducks/product/operations';
import ArraySelectInput from '../../components/uikit/ArraySelectInput';


const SalesStatement = ({ x, index, taxIncluded }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const productRows = useMemo(()=>selector.products.rows.filter( x => x.salesProduct),[])

  const [ productId, setProductId ] = useState(x.productId)         // 商品ID
  const [ price, setPrice ]         = useState(x.price)               // 単価
  const [ quantity, setQuantity ]   = useState(x.quantity)            // 数量
  const [ unit, setUnit ]           = useState(x.unit)                // 単価
  const [ amount, setAmount ]       = useState(x.amount)              // 金額
  const [ billing, setBilling ]       = useState(x.billing)           // 請求額
  const [ taxAmount, setTaxAmount ]       = useState(x.taxAmount)     // 税額
  const [ remarks, setRemarks ]     = useState(x.remarks)             // 備考
  
  const inputProductId         = useCallback(e => setProductId(e.target.value),[])
  const inputPrice             = useCallback(e => setPrice(parseInt(e.target.value) ),[])
  const inputQuantity          = useCallback(e => setQuantity(parseInt(e.target.value)),[])
  const inputUnit              = useCallback(e => setUnit(e.target.value),[])
  const inputRemarks           = useCallback(e => setRemarks(e.target.value),[])

  useEffect(()=>{
      const amount = calcTotalAmount()
      dispatch( StatementPush({ statementNo: index + 1, productId, price, quantity, unit, amount}, taxIncluded))
  },[ price, quantity, taxIncluded ])

  function calcTotalAmount () {
      const total = parseInt( price * quantity)
      
      setAmount(total)
      return total
  }

  useEffect(()=>{
    if ( !productRows.length ) dispatch( productDataGetOperation() )
  },[])

  useEffect(()=>{
    if (productId && !price) {
      const selectProduct = findProductId(productId)
      setPrice( parseInt(selectProduct[ selectProduct.defaultUnitPrice ]) )
      setUnit(selectProduct.unit)
      setQuantity(1)
    }
  },[productId])

  useEffect(()=>{
    if (productId) {
      const selectProduct = findProductId(productId)
      if (taxIncluded) {
        setPrice(selectProduct[`unitPriceIn_${selectProduct.defaultUnitPrice}`])
        setUnit(selectProduct.unit)
        setQuantity(1)
      } else {
        console.log("税抜き")
        setPrice(selectProduct[`unitPrice_${selectProduct.defaultUnitPrice}`])
        setUnit(selectProduct.unit)
        setQuantity(1)
      }
    }
  },[productId,taxIncluded])

  function findProductId(Id) {
    return productRows.find( x => x.productId === Id)
  }


  return (

        <TableRow>
          <TableCell className={classes.veryShortRow}>
            <Typography>{index + 1}</Typography>
          </TableCell>
          <TableCell className={classes.longRow}>
            <SelectInput label={"商品名"} onChange={inputProductId}
              value={productId} selectArray={productRows}
              selectValue={"productId"} selectList={"productName"}
            />
          </TableCell>
          <TableCell className={classes.shortRow}>
            <TextInput label={"単価"} styleClass={false}  value={price} name="price" onChange={inputPrice} type="number"/>
          </TableCell>
          <TableCell className={classes.shortRow}>
            <TextInput label={"数量"} styleClass={false} value={quantity} name="quantity" onChange={inputQuantity} type="number"/>
          </TableCell>
          <TableCell className={classes.shortRow}>
            <ArraySelectInput label={"単位"} value={unit} selectArray={selectUnit} onChange={inputUnit} styles={true}/>
          </TableCell>
          <TableCell className={classes.shortNumberRow}>
            <Typography>{amount? `${amount.toLocaleString()} 円`: "" }</Typography>
          </TableCell>
          <TableCell className={classes.longAutoRow}>
          　<TextField label={"備考"} value={remarks}  onChange={inputRemarks} type="text" className={classes.remarks} variant="outlined"/>
          </TableCell>
        </TableRow>
  
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
    veryShortRow: {
      width: "3rem",
      margin: 0,
      border: "0px none",
      textAlign: "center",
      padding: "0 1rem",
    },
    shortRow: {
      width: "5rem",
      margin: 0,
      border: "0px none",
      textAlign: "center",
      padding: "0 1rem",

    },
    shortNumberRow: {
      width: "10rem",
      margin: 0,
      // padding: 0,
      border: "0px none",
      textAlign: "center",
      padding: "0 1rem",

    },
    longRow: {
      width: "15rem",
      margin: 0,
      border: "0px none",
      padding: "0 1rem",

    },
    longAutoRow: {
      width: "100%",
      margin: 0,
      border: "0px none",
      padding: "0 1rem",

    },
    remarks: {
      width: "100%",
    },
  }));