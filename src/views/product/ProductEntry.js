import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productInputOperation } from '../../reducks/product/operations';
import { makeStyles } from '@material-ui/core/styles';
import { MainButton, TextInput, SelectInput, SwitchInput } from '../../components/uikit';
import { selectUnit, taxRateList } from '../../reducks/store/fixedData';
import { Grid, Typography } from '@material-ui/core';
import ArraySelectInput from '../../components/uikit/ArraySelectInput';

const ProductEntry = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const products = selector.products
  const supplierRows = selector.suppliers.rows
  const [ productName,     setProductName ] = useState(products.productName)
  const [ proNickname,     setProNickname ]     = useState(products.proNickname)
  const [ supplierId,      setSupplierId ]     = useState(products.supplierId)
  const [ inventoryControl, setInventoryControl ]     = useState(products.inventoryControl)
  const [ salesProduct, setSalesProduct ]     = useState(products.salesProduct)
  const [ defaultUnitPrice,  setDefaultUnitPrice ]  = useState(products.defaultUnitPrice)
  const [ unitPrice_01,    setUnitPrice_01 ] = useState(products.unitPrice_01)
  const [ unitPrice_02,    setUnitPrice_02 ] = useState(products.unitPrice_02)
  const [ unitPrice_03,    setUnitPrice_03 ] = useState(products.unitPrice_03)
  const [ unitPrice_04,    setUnitPrice_04 ] = useState(products.unitPrice_04)
  const [ unitPrice_05,    setUnitPrice_05 ] = useState(products.unitPrice_05)
  const [ tax_01,    setTax_01 ] = useState(products.tax_01)
  const [ tax_02,    setTax_02 ] = useState(products.tax_02)
  const [ tax_03,    setTax_03 ] = useState(products.tax_03)
  const [ tax_04,    setTax_04 ] = useState(products.tax_04)
  const [ tax_05,    setTax_05 ] = useState(products.tax_05)
  const [ unitPriceIn_01,    setUnitPriceIn_01 ] = useState(products.unitPriceIn_01)
  const [ unitPriceIn_02,    setUnitPriceIn_02 ] = useState(products.unitPriceIn_02)
  const [ unitPriceIn_03,    setUnitPriceIn_03 ] = useState(products.unitPriceIn_03)
  const [ unitPriceIn_04,    setUnitPriceIn_04 ] = useState(products.unitPriceIn_04)
  const [ unitPriceIn_05,    setUnitPriceIn_05 ] = useState(products.unitPriceIn_05)
  const [ unit, setUnit ] = useState(products.unit)

  // const [ classification_01, setClassification_01 ]    = useState(selector.classification_01)
  // const [ classification_02, setClassification_02 ]    = useState(selector.classification_02)
  // const [ classification_03, setClassification_03 ]    = useState(selector.classification_03)
  // const [ classification_04, setClassification_04 ]    = useState(selector.classification_04)
  // const [ classification_05, setClassification_05 ]    = useState(selector.classification_05)
  // const [ classification_06, setClassification_06 ]    = useState(selector.classification_06)
  // const [ classification_07, setClassification_07 ]    = useState(selector.classification_07)
  // const [ classification_08, setClassification_08 ]    = useState(selector.classification_08)
  // const [ classification_09, setClassification_09 ]    = useState(selector.classification_09)
  // const [ classification_10, setClassification_10 ]    = useState(selector.classification_10)

  const inputProductName = useCallback((e) => setProductName(e.target.value),[productName])
  const inputProNickname     = useCallback((e) => setProNickname(e.target.value),    [proNickname])
  const inputSupplierId     = useCallback((e) => setSupplierId(e.target.value),    [supplierId])
  const inputInventoryControl = useCallback((e) => setInventoryControl(e.target.checked),[])
  const inputSalesProduct     = useCallback((e) => setSalesProduct(e.target.checked),[])
  const inputDefaultUnitPrice  = useCallback((e) => setDefaultUnitPrice(e.target.value), [defaultUnitPrice])
  const inputUnitPrice_01 = useCallback((e) => setUnitPrice_01(Number(e.target.value)),[])
  const inputUnitPrice_02 = useCallback((e) => setUnitPrice_02(Number(e.target.value)),[])
  const inputUnitPrice_03 = useCallback((e) => setUnitPrice_03(Number(e.target.value)),[])
  const inputUnitPrice_04 = useCallback((e) => setUnitPrice_04(Number(e.target.value)),[])
  const inputUnitPrice_05 = useCallback((e) => setUnitPrice_05(Number(e.target.value)),[])
  const inputTax_01 = useCallback((e) => setTax_01(e.target.value),[])
  const inputTax_02 = useCallback((e) => setTax_02(e.target.value),[])
  const inputTax_03 = useCallback((e) => setTax_03(e.target.value),[])
  const inputTax_04 = useCallback((e) => setTax_04(e.target.value),[])
  const inputTax_05 = useCallback((e) => setTax_05(e.target.value),[])
  const inputUnitPriceIn_01 = useCallback((e) => setUnitPriceIn_01(e.target.value),[])
  const inputUnitPriceIn_02 = useCallback((e) => setUnitPriceIn_02(e.target.value),[])
  const inputUnitPriceIn_03 = useCallback((e) => setUnitPriceIn_03(e.target.value),[])
  const inputUnitPriceIn_04 = useCallback((e) => setUnitPriceIn_04(e.target.value),[])
  const inputUnitPriceIn_05 = useCallback((e) => setUnitPriceIn_05(e.target.value),[])
  const inputUnit = useCallback((e) => setUnit(e.target.value),[])


  useEffect(()=>{
    const value = unitPrice_01 + Math.floor(unitPrice_01 * tax_01 / 100)
    setUnitPriceIn_01(Number(value))
  },[unitPrice_01])
  useEffect(()=>{
    const value = unitPrice_02 + Math.floor(unitPrice_02 * tax_02 / 100)
    setUnitPriceIn_02(Number(value))
  },[unitPrice_02])
  useEffect(()=>{
    const value = unitPrice_03 + Math.floor(unitPrice_03 * tax_03 / 100)
    setUnitPriceIn_03(Number(value))
  },[unitPrice_03])
  useEffect(()=>{
    const value = unitPrice_04 + Math.floor(unitPrice_04 * tax_04 / 100)
    setUnitPriceIn_04(Number(value))
  },[unitPrice_04])
  useEffect(()=>{
    const value = unitPrice_05 + Math.floor(unitPrice_05 * tax_05 / 100)
    setUnitPriceIn_05(Number(value))
  },[unitPrice_05])


  const createProduct = () => {
    const state = {
      ...selector.products,
      productName,
      proNickname,
      supplierId,
      inventoryControl,
      salesProduct,
      defaultUnitPrice,
      unitPrice_01,
      unitPrice_02,
      unitPrice_03,
      unitPrice_04,
      unitPrice_05,
      tax_01,
      tax_02,
      tax_03,
      tax_04,
      tax_05,
      unitPriceIn_01,
      unitPriceIn_02,
      unitPriceIn_03,
      unitPriceIn_04,
      unitPriceIn_05,
      unit,
    }
    props.handleClose()
    dispatch(productInputOperation(state))
  }

  function PriceEntryArea() {

    function AreaCore(number, unitPrice, tax, unitPriceIn, inputUnitPrice, inputTax, inputUnitPriceIn) {

      return (
        <Grid item container direction="row" justify="flex-start" alignItems="center" spacing={3}>
            <Grid item xs={3} md={3}>
                <TextInput label={`単価${number}`} styleClass={false}
                  value={unitPrice} autoComplete="off"
                  type={"number"} onChange={inputUnitPrice}
                />
            </Grid>
            <Grid item xs={2} md={2}>
              <Typography align="right">{`${unitPrice.toLocaleString()} 円`}</Typography>
            </Grid>
            <Grid item xs={2} md={2} style={{textAlign:"center"}}>
                <ArraySelectInput label={`税率${number}`} value={tax} selectArray={taxRateList} onChange={inputTax} styles={true} />
            </Grid>
            <Grid item xs={3} md={3}>
                <TextInput label={`税込${number}`} styleClass={false}
                  value={unitPriceIn} autoComplete="off"
                  type={"number"} onChange={inputUnitPriceIn}
                />
            </Grid>
            <Grid item xs={2} md={2}>
              <Typography align="right">{`${unitPriceIn.toLocaleString()} 円`}</Typography>
            </Grid>
        </Grid>
      )
    }

    return(
      <Grid container direction="column" alignItems="center">
          {AreaCore('1', unitPrice_01, tax_01, unitPriceIn_01, inputUnitPrice_01, inputTax_01, inputUnitPriceIn_01)}
          {AreaCore('2', unitPrice_02, tax_02, unitPriceIn_02, inputUnitPrice_02, inputTax_02, inputUnitPriceIn_02)}
          {AreaCore('3', unitPrice_03, tax_03, unitPriceIn_03, inputUnitPrice_03, inputTax_03, inputUnitPriceIn_03)}
          {AreaCore('4', unitPrice_04, tax_04, unitPriceIn_04, inputUnitPrice_04, inputTax_04, inputUnitPriceIn_04)}
          {AreaCore('5', unitPrice_05, tax_05, unitPriceIn_05, inputUnitPrice_05, inputTax_05, inputUnitPriceIn_05)}
      </Grid>
    )
  }

  return (
    <form className={classes.root}>
      <Grid container direction="column" alignItems="center" spacing={6}>
        <Grid item>
            <Grid item>
              <TextInput label={"通称"} fullWidth={"default"} multiline={false} required={true}
                rows={1} value={proNickname} name="proNickname" autoComplete="off"
                type={"text"} onChange={inputProNickname}
              />
            </Grid>
            <Grid item>
              <TextInput label={"商品名"} fullWidth={"default"} multiline={false} required={false}
                rows={1} value={productName} name="productName" autoComplete="off"
                type={"text"} onChange={inputProductName}
              />
            </Grid>
            <Grid item container direction="row" justify="flex-start" alignItems="center" spacing={6}>
              <Grid item>
                <SelectInput label={"仕入先"} onChange={inputSupplierId}
                  value={supplierId} selectArray={supplierRows}
                  selectValue={"supplierId"} selectList={"supplierName"}
                />
              </Grid>
              <Grid item>
                  <ArraySelectInput label={"単位"} value={unit} selectArray={selectUnit} onChange={inputUnit} />
              </Grid>
              <Grid item>
                <SwitchInput label={"在庫管理"} value={inventoryControl} onChange={inputInventoryControl}  color={"secondary"} />
              </Grid>
              <Grid item>
                  <SwitchInput label={"販売商品"} value={salesProduct} onChange={inputSalesProduct} color={"secondary"} />
              </Grid>
            </Grid>
              {PriceEntryArea()}
        </Grid>

        <Grid item container direction="row" justify="center" alignItems="center" spacing={3}>
          <Grid className={classes.center}>
            <MainButton label={"登録"} color="primary" onClick={createProduct} />
          </Grid>
          <Grid className={classes.center}>
            <MainButton label={"戻る"} color="secondary" onClick={props.handleClose}/>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: "1rem",
    height: "auto",
    width: "calc(80% - 2rem)",
  },
  center : {
    margin: "0 auto",
    textAlign: "center",
  }
}));

export default ProductEntry;