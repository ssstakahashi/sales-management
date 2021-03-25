import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { AccountingDataGetOperation, AccountingDialogOpenOperation } from '../../reducks/accounting/operations';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountingDialog from './AccountingDialog'
import initialState from '../../reducks/store/initialState';
import { selectEntity } from '../../reducks/store/fixedData';
import { SupplierDataGetOperation } from '../../reducks/supplier/operations';
import { MainButton } from '../../components/uikit';
import { push } from 'connected-react-router';
import { Grid, Paper } from '@material-ui/core';
import { DialogCloseOperation } from '../../reducks/dialog/operations';


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

const Accounting = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const rows = selector.accountings.rows

  const handleClickOpen = (row) => {
    dispatch(AccountingDialogOpenOperation(row))
  }

  // useEffect(()=>{
  //   if ( !supplierRows.length ) dispatch( SupplierDataGetOperation() )
  // },[])
  // useEffect(()=>{
  //   if ( !rows.length ) dispatch( AccountingDataGetOperation() )
  // },[])

  return (
    <TableContainer component={Paper}>
      <Grid>
        <AddCircleIcon color="secondary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>handleClickOpen()}/>
      </Grid>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell align="center">仕訳番号</TableCell>
            <TableCell align="center">仕訳日</TableCell>
            <TableCell align="center">勘定科目（借方）</TableCell>
            <TableCell align="right">金額&nbsp;(円)</TableCell>
            <TableCell align="right">税</TableCell>
            <TableCell align="center">勘定科目（借方）</TableCell>
            <TableCell align="right">金額&nbsp;(円)</TableCell>
            <TableCell align="right">税</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ?
            rows.map(( row, index) => (
            <TableRow key={row.accountingId} onClick={()=>handleClickOpen(row)}>
              <TableCell component="th" scope="row" align="center">{row.journalNumber}</TableCell>
              <TableCell align="center">{row.journalDate}</TableCell>
              <TableCell align="left">{row.debitAccount}</TableCell>
              <TableCell align="left">{row.debitAmount}</TableCell>
              <TableCell align="right">{row.debitTax}</TableCell>
              <TableCell align="left">{row.creditAccount}</TableCell>
              <TableCell align="right">{row.creditAmount}</TableCell>
              <TableCell align="right">{row.creditTax}</TableCell>
            </TableRow>
          )) : <></>}
        </TableBody>
      </Table>
      <AccountingDialog/>

      <Grid className={classes.center}>
        <MainButton label={"戻る"} color="secondary" onClick={()=>dispatch(push('/'))}/>
      </Grid>
    </TableContainer>
  );
}

export default Accounting;