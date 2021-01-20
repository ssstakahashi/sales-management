import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TableBody, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PaymentEntryStatement from './PaymentEntryStatement';
import { PlusPaymentStatementOperation } from '../../../reducks/sales/operations';

const PaymentEntry = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
//   const productRows = selector.products.rows
  const docId = selector.sales.docId; 
  const plannedTotalAmount = selector.sales.plannedTotalAmount || 0  // 予定入金総額
  const depositRecord = selector.sales.depositRecord || [];
  // const totalAmount  =  selector.sales.totalAmount// 売上合計額
  const actualTotalAmount= selector.sales.actualTotalAmount || 0  // 実際入金総額

  const plusPaymentStatement = (remove) => {
    if ( !remove ) {
      dispatch( PlusPaymentStatementOperation(remove) )
    } else {
      if ( depositRecord.length >= 2  ) {
        dispatch( PlusPaymentStatementOperation(remove) )
      }
    }
　}

  return (
      <Grid container direction="column" justify="center" alignItems="flex-start" spacing={3} className={classes.paperInner}>
        <Grid item container direction="row" justify="flex-start" alignItems="center" spacing={5}>
          <Grid item>
              <Typography variant={"h6"}>{`予定額： ${plannedTotalAmount.toLocaleString()} 円`}</Typography>
          </Grid>
          <Grid item>
              <Typography variant={"h6"}>{`入金額： ${actualTotalAmount.toLocaleString()} 円`}</Typography>
          </Grid>
        </Grid>
          <TableBody>
            {depositRecord.map(( x, index) => <PaymentEntryStatement key={x.serialPaymentNumber} x={x} index={index} docId={docId}/>)}
         </TableBody>
          <Grid item container direction="row" justify="center" alignItems="center" style={{padding: 0}}>
            <Grid item>
                <AddCircleIcon color="primary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>plusPaymentStatement(false)}/>
            </Grid>
            <Grid item>
                <RemoveCircleIcon color="secondary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>plusPaymentStatement(true)}/>
            </Grid>
          </Grid>

      </Grid>
    )
}

export default PaymentEntry;

const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
    },
    paperInner: {
      width: "100%",
      padding: "2rem",
    },
  }));