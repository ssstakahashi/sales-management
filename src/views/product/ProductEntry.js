import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productInputOperation } from '../../reducks/product/operations';
import { makeStyles } from '@material-ui/core/styles';
import { MainButton, TextInput, SelectInput } from '../../components/uikit';
import { PayoutPeriodList } from '../../reducks/store/fixedData';

const ProductEntry = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state.product);

  console.log(selector)

  // supplierId        : "",
  // supplierName      : "",
  // supBranchName     : "",

  const [ productName,     setProductName ] = useState(selector.productName)
  const [ proNickname,     setProNickname ]     = useState(selector.proNickname)
  const [ defaultUnitPrice,  setDefaultUnitPrice ]  = useState(selector.defaultUnitPrice)
  const [ unitPrice_01,    setUnitPrice_01 ] = useState(selector.unitPrice_01)
  const [ unitPrice_02,    setUnitPrice_02 ] = useState(selector.unitPrice_02)
  const [ unitPrice_03,    setUnitPrice_03 ] = useState(selector.unitPrice_03)
  const [ unitPrice_04,    setUnitPrice_04 ] = useState(selector.unitPrice_04)
  const [ unitPrice_05,    setUnitPrice_05 ] = useState(selector.unitPrice_05)
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
  const inputDefaultUnitPrice  = useCallback((e) => setDefaultUnitPrice(e.target.value), [defaultUnitPrice])
  const inputUnitPrice_01 = useCallback((e) => setUnitPrice_01(e.target.value),[unitPrice_01])
  const inputUnitPrice_02 = useCallback((e) => setUnitPrice_02(e.target.value),[unitPrice_02])
  const inputUnitPrice_03 = useCallback((e) => setUnitPrice_03(e.target.value),[unitPrice_03])
  const inputUnitPrice_04 = useCallback((e) => setUnitPrice_04(e.target.value),[unitPrice_04])
  const inputUnitPrice_05 = useCallback((e) => setUnitPrice_05(e.target.value),[unitPrice_05])

  const createProduct = () => {
    const state = {
      ...selector,
      productName,
      proNickname,
      defaultUnitPrice,
      unitPrice_01,
      unitPrice_02,
      unitPrice_03,
      unitPrice_04,
      unitPrice_05,
    }
    dispatch(productInputOperation(state))
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
            value={proNickname}
            name="proNickname"
            autoComplete="off"
            type={"text"}
            onChange={inputProNickname}
          />
        </div>
        <div>
          <TextInput
            label={"商品名"}
            fullWidth={true}
            multiline={false}
            required={false}
            rows={1}
            value={productName}
            name="productName"
            autoComplete="off"
            type={"text"}
            onChange={inputProductName}
          />
        </div>
        <div>
          <TextInput
            label={"単価１"}
            fullWidth={false}
            multiline={false}
            required={false}
            rows={1}
            value={unitPrice_01}
            name="unitPrice_01"
            autoComplete="off"
            type={"number"}
            onChange={inputUnitPrice_01}
          />
        </div>
        <div>
          <TextInput
            label={"単価２"}
            fullWidth={false}
            multiline={false}
            required={false}
            rows={1}
            value={unitPrice_02}
            name="unitPrice_02"
            autoComplete="off"
            type={"number"}
            onChange={inputUnitPrice_02}
          />
        </div>
        <div>
          <TextInput
            label={"単価３"}
            fullWidth={false}
            multiline={false}
            required={false}
            rows={1}
            value={unitPrice_03}
            name="unitPrice_03"
            autoComplete="off"
            type={"number"}
            onChange={inputUnitPrice_03}
          />
        </div>
        <div>
          <TextInput
            label={"単価４"}
            fullWidth={false}
            multiline={false}
            required={false}
            rows={1}
            value={unitPrice_04}
            name="unitPrice_04"
            autoComplete="off"
            type={"number"}
            onChange={inputUnitPrice_04}
          />
        </div>
        <div>
          <TextInput
            label={"単価５"}
            fullWidth={false}
            multiline={false}
            required={false}
            rows={1}
            value={unitPrice_05}
            name="unitPrice_05"
            autoComplete="off"
            type={"number"}
            onChange={inputUnitPrice_05}
          />
        </div>
      </div>
      <div className={classes.center}>
        <MainButton label={"登録"} color="primary" onClick={createProduct} />
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

export default ProductEntry;