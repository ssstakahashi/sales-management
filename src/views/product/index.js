import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { productDataGetOperation, productDialogCloseOperation, productDialogOpenOperation } from '../../reducks/product/operations';
import ProductDialog from './ProductDialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import initialState from '../../reducks/store/initialState';
import { MainButton } from '../../components/uikit';
import { push } from 'connected-react-router';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 30,
  },
  center : {
    margin: "0 auto",
    textAlign: "center",
  },
});

const Product = () => {
  const classes = useStyles();
  const [ open, setOpen ] = useState(false)
  const dispatch = useDispatch();
  const selector = useSelector( state => state.products);
  const rows = selector.rows

  const handleClickOpen = (row = initialState.products) => {
    setOpen(true)
    dispatch( productDialogOpenOperation(row) )
  }

  const handleClose = () => {
    setOpen(false)
    dispatch( productDialogCloseOperation() )
  }

  useEffect(()=>{
    if ( !rows.length ) dispatch( productDataGetOperation() )
  },[])

  const ToLocaleString = (value) => {
    console.log(value)
    if (value) { return Number(value).toLocaleString() }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="center">通称</TableCell>
            <TableCell align="center">正式名称</TableCell>
            <TableCell align="center">仕入先</TableCell>
            <TableCell align="center">単価１</TableCell>
            <TableCell align="center">単価２</TableCell>
            <TableCell align="center">単価３</TableCell>
            <TableCell align="center">単価４</TableCell>
            <TableCell align="center">単価５</TableCell>
            <TableCell align="center">単位</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ?
            rows.map((row, index) => (
            <TableRow key={row.productId} onClick={()=>handleClickOpen(row)}>
              <TableCell component="th" scope="row">{index + 1}</TableCell>
              <TableCell align="left">{row.proNickname}</TableCell>
              <TableCell align="left">{row.productName}</TableCell>
              <TableCell align="left">{row.supplierId}</TableCell>
              <TableCell align="left">{ToLocaleString(row.unitPrice_01)}</TableCell>
              <TableCell align="left">{ToLocaleString(row.unitPrice_02)}</TableCell>
              <TableCell align="left">{ToLocaleString(row.unitPrice_03)}</TableCell>
              <TableCell align="left">{ToLocaleString(row.unitPrice_04)}</TableCell>
              <TableCell align="left">{ToLocaleString(row.unitPrice_05)}</TableCell>
              <TableCell align="left">{row.unit}</TableCell>
            </TableRow>
          )) : <></>}
        </TableBody>
      </Table>
      <ProductDialog handleClose={handleClose} open={open}/>
      <AddCircleIcon color="secondary" style={{ fontSize:"3rem", margin: "1rem 2rem"}}
        onClick={()=>handleClickOpen()}
      />
      <div className={classes.center}>
        <MainButton label={"戻る"} color="secondary" onClick={()=>dispatch(push('/'))}/>
      </div>

    </TableContainer>
  );
}

export default Product;