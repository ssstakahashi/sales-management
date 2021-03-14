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
import { selectEntity } from '../../reducks/store/fixedData';
import { SupplierDataGetOperation } from '../../reducks/supplier/operations';
import { MainButton } from '../../components/uikit';
import { push } from 'connected-react-router';
import { Grid, Paper } from '@material-ui/core';
import { DialogOpenOperation } from '../../reducks/dialog/operations';


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

const CollectionIndex = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const rows = selector.collections.rows


  return (
    <TableContainer component={Paper}>
      <Grid>
        <AddCircleIcon color="secondary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>dispatch(DialogOpenOperation('collections'))}/>
      </Grid>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell align="center">No.</TableCell>
            <TableCell align="center">売上日</TableCell>
            <TableCell align="center">取引先</TableCell>
            <TableCell align="center">件名</TableCell>
            <TableCell align="right">請求額&nbsp;(円)</TableCell>
    
            <TableCell align="center">入金額&nbsp;(円)</TableCell>
            <TableCell align="center">残入金額&nbsp;(円)</TableCell>
            <TableCell align="center">主体</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
      <SalesDialog />

      <Grid className={classes.center}>
        <MainButton label={"戻る"} color="secondary" onClick={()=>dispatch(push('/'))}/>
      </Grid>
    </TableContainer>
  );
}

export default CollectionIndex;