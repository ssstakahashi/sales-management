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
import { productDataGetOperation, productDialogCloseOperation, productDialogOpenOperation } from '../../reducks/product/operations';
import ProductDialog from './ProductDialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import initialState from '../../reducks/store/initialState';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Product = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state.products);
  const rows = selector.rows

  const handleClickOpen = (row = initialState.products) => {
    dispatch( productDialogOpenOperation(row) )
  }

  const handleClose = () => {
    dispatch( productDialogCloseOperation() )
  }

  useEffect(()=>{
    if ( rows.length === 0 ) dispatch( productDataGetOperation() )
  },[])


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="center">通称</TableCell>
            <TableCell align="center">正式名称</TableCell>
            <TableCell align="center">郵便番号</TableCell>
            <TableCell align="center">住所</TableCell>
            <TableCell align="center">電話番号</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">携帯</TableCell>
            <TableCell align="center">担当者</TableCell>
            <TableCell align="center">回収期間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.supplierId} onClick={()=>handleClickOpen(row)}>
              <TableCell component="th" scope="row">{index + 1}</TableCell>
              <TableCell align="left">{row.supTemporaryName}</TableCell>
              <TableCell align="left">{row.supplierName}</TableCell>
              <TableCell align="left">{row.supplierPostCode}</TableCell>
              <TableCell align="left">{row.supplierAddress}</TableCell>
              <TableCell align="left">{row.supplierPhone}</TableCell>
              <TableCell align="left">{row.supplierEmail}</TableCell>
              <TableCell align="left">{row.supplierMobile}</TableCell>
              <TableCell align="left">{row.supplierInCharge}</TableCell>
              <TableCell align="left">{row.payoutPeriod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ProductDialog handleClose={handleClose} open={selector.open}/>
      <AddCircleIcon color="secondary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>handleClickOpen()}/>

    </TableContainer>
  );
}

export default Product;