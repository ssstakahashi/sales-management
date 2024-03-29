import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { SalesDataGetOperation, SalesDialogCloseOperation, SalesDialogOpenOperation } from '../../reducks/sales/operations';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SalesDialog from './SalesDialog'
import initialState from '../../reducks/store/initialState';

import { SupplierDataGetOperation } from '../../reducks/supplier/operations';
import { MainButton } from '../../components/uikit';
import { push } from 'connected-react-router';
import { Grid, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  tableHeader : {
    backgroundColor: theme.palette.primary.dark,
  },
  center : {
    margin: "2rem auto",
    textAlign: "center",
  },
}));

const Sales = () => {
  const classes = useStyles();
  const [ open, setOpen ] = useState(false)
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const sales = selector.sales
  const supplierRows = selector.suppliers.rows || []
  const rows = sales.rows

  console.log(supplierRows)

  const handleClickOpen = (row = initialState.sales) => {
    setOpen(true)
    dispatch( SalesDialogOpenOperation(row) )
  }

  const handleClose = () => {
    setOpen(false)
    dispatch( SalesDialogCloseOperation() )
  }

  const supplierDisplay = (value) => {
    const Value = supplierRows.find( x => x.supplierId === value )
    return Value ? Value.supTemporaryName : ""
  }


  useEffect(()=>{
    if ( !supplierRows.length ) dispatch( SupplierDataGetOperation() )
  },[])

  useEffect(()=>{
    if ( !rows.length ) dispatch( SalesDataGetOperation() )
  },[])

  return (
    <TableContainer component={Paper}>
      <Grid>
        <AddCircleIcon color="secondary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>handleClickOpen()}/>
      </Grid>
      <Table className={classes.table} size="small">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell align="center">No.</TableCell>
            <TableCell align="center">売上日</TableCell>
            <TableCell align="center">取引先</TableCell>
            <TableCell align="center">件名</TableCell>
            <TableCell align="right">売上高&nbsp;(円)</TableCell>
            <TableCell align="right">消費税</TableCell>
            <TableCell align="right">請求額&nbsp;(円)</TableCell>
            <TableCell align="center">ステータス</TableCell>
            <TableCell align="center">入金額&nbsp;(円)</TableCell>
            <TableCell align="center">残入金額&nbsp;(円)</TableCell>
            <TableCell align="center">主体</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ?
            rows.map(( row, index) => (
            <TableRow key={row.serialNumber} onClick={()=>handleClickOpen(row)}draggable>
              <TableCell component="th" scope="row" align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.salesDay}</TableCell>
              <TableCell align="left">{supplierDisplay(row.supplierId)}</TableCell>
              <TableCell align="left">{row.salesSubject}</TableCell>
              <TableCell align="right">{row.totalAmount.toLocaleString()}</TableCell>
              <TableCell align="right">{row.taxIncluded ? "込" : "抜"}</TableCell>
              <TableCell align="right">{row.billingAmount && row.billingAmount.toLocaleString()}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{"入金額"}</TableCell>
              <TableCell align="right">{"残"}</TableCell>
              <TableCell align="left">{supplierDisplay(row.salesEntity)}</TableCell>
            </TableRow>
          )) : <></>}
        </TableBody>
      </Table>
      <SalesDialog handleClose={handleClose} open={open}/>

      <Grid className={classes.center}>
        <MainButton label={"戻る"} color="secondary" onClick={()=>dispatch(push('/'))}/>
      </Grid>
    </TableContainer>
  );
}

export default Sales;