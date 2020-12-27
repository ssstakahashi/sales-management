import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { salesDataGetOperation, salesDialogCloseOperation, salesDialogOpenOperation } from '../../reducks/sales/operations';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SalesDialog from './SalesDialog'
import initialState from '../../reducks/store/initialState';
import { selectEntity } from '../../reducks/store/fixedData';
import { supplierDataGetOperation } from '../../reducks/supplier/operations';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Sales = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Selector = useSelector( state => state);
  const selector = Selector.sales
  const supplierRows = Selector.supplier.rows || []

  const rows = selector.rows
  console.log(selector)

  const handleClickOpen = (row = initialState.sales) => {
    dispatch( salesDialogOpenOperation(row) )
  }

  const handleClose = () => {
    dispatch( salesDialogCloseOperation() )
  }

  const entityDisplay = (value) => {
    const Value = selectEntity.find( x => x.id === value )
    return Value ? Value.name : "高橋企画"
  }

  const supplierDisplay = (value) => {
    console.log(value)
    const Value = supplierRows.find( x => x.supplierId === value )
    return Value.supTemporaryName
  }

  useEffect(()=>{
    if ( rows.length === 0 ) dispatch( salesDataGetOperation() )
  },[])

  useEffect(()=>{
    if ( supplierRows.length === 0 ) dispatch( supplierDataGetOperation() )
  },[])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">No.</TableCell>
            <TableCell align="center">売上日</TableCell>
            <TableCell align="center">取引先</TableCell>
            <TableCell align="center">件名</TableCell>
            <TableCell align="center">売上高&nbsp;(円)</TableCell>
            <TableCell align="center">ステータス</TableCell>
            <TableCell align="center">入金額&nbsp;(円)</TableCell>
            <TableCell align="center">残入金額&nbsp;(円)</TableCell>
            <TableCell align="center">主体</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(( row, index) => (
            <TableRow key={row.serialNumber} onClick={()=>handleClickOpen(row)}>
              <TableCell component="th" scope="row" align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.salesDay}</TableCell>
              <TableCell align="left">{supplierDisplay(row.supplierId)}</TableCell>
              <TableCell align="left">{row.salesSubject}</TableCell>
              <TableCell align="right">{row.totalAmount.toLocaleString()}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{"入金額"}</TableCell>
              <TableCell align="right">{"残"}</TableCell>
              <TableCell align="right">{entityDisplay(row.salesEntity)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SalesDialog handleClose={handleClose} open={selector.open}/>
      <AddCircleIcon color="secondary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>handleClickOpen()}/>
    </TableContainer>
  );
}

export default Sales;