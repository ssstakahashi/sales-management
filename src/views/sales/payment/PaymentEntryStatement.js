import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, DateInput, SwitchInput } from '../../../components/uikit';
import { TotalCalculationPaymentStatementOperation } from '../../../reducks/sales/operations';
import Checkbox from '@material-ui/core/Checkbox';
import { TableBody, TableCell, TableRow, Typography } from '@material-ui/core';

const PaymentEntryStatement = ({ x, index, docId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  // const depositRecord = selector.sales.depositRecord || [];
  // console.log(depositRecord)
  const [ done, setDone ]                                 = useState(x.done) // 入金済みか否か
  const [ plannedDepositDate, setPlannedDepositDate ]     = useState(x.plannedDepositDate)   // 入金予定日(売上時点)
  const [ plannedDepositAmount, setPlannedDepositAmount ] = useState(x.plannedDepositAmount) // 入金予定額
  const [ actualDepositDate, setActualDepositDate ]       = useState(x.actualDepositDate)   // 実際入金日
  const [ actualDepositAmount, setActualDepositAmount ]   = useState(x.actualDepositAmount)  // 実際入金額

  const inputDone                 = useCallback( e => setDone(e.target.checked),[done])
  const inputPlannedDepositDate   = useCallback( e => setPlannedDepositDate(e.target.value),[plannedDepositDate])
  const inputPlannedDepositAmount = useCallback( e => setPlannedDepositAmount(parseInt(e.target.value) ),[plannedDepositAmount])
  const inputActualDepositDate    = useCallback( e => setActualDepositDate(parseInt(e.target.value)),[actualDepositDate])
  const inputActualDepositAmount  = useCallback( e => setActualDepositAmount(e.target.value),[actualDepositAmount])

  const ActualDepositDate   = done ? selector.sales.depositRecord[index].actualDepositDate   : actualDepositDate
  const ActualDepositAmount = done ? selector.sales.depositRecord[index].actualDepositAmount : actualDepositAmount
  console.log(selector)

  useEffect(()=>{
    // if (depositRecord.length !== 0 ) {
      const serialPaymentNumber = index + 1
      dispatch( TotalCalculationPaymentStatementOperation({ docId, done, plannedDepositDate, plannedDepositAmount, actualDepositDate, actualDepositAmount, serialPaymentNumber }) )
    // }
  },[ done, plannedDepositAmount, actualDepositAmount ])

  return (

  
        <TableRow className={classes.container}>
          <TableCell className={classes.veryShortRow}>
            <Typography>{index + 1}</Typography>
          </TableCell>
          <TableCell className={classes.veryShortRow}>
            <Checkbox label={"状況"} value={done} onChange={inputDone} color={"primary"}/>
          </TableCell>
          <TableCell className={classes.shortRow}>
            <DateInput label={"回収予定"} value={plannedDepositDate} onChange={inputPlannedDepositDate} />
          </TableCell>
          <TableCell  className={classes.shortRow}>
            <TextInput label={"予定額"} fullWidth={false} required={false} value={plannedDepositAmount} onChange={inputPlannedDepositAmount} type="number"/>
          </TableCell>
          <TableCell className={classes.shortRow}>
            <DateInput label={"入金日"} value={ActualDepositDate} onChange={inputActualDepositDate} />
          </TableCell>
          <TableCell className={classes.shortRow}>
            <TextInput label={"入金額"} fullWidth={false} required={false} value={ActualDepositAmount} onChange={inputActualDepositAmount} type="number"/>
          </TableCell>
        </TableRow>

 
    )
}

export default PaymentEntryStatement;

const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
      display : "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems : "center",
    },
    veryShortRow: {
      minWidth: "3rem",
      margin: 0,
      border: "0px none",
      textAlign: "center",
    },
    shortRow: {
      minWidth: "10rem",
      margin: 0,
      border: "0px none",
      textAlign: "center",
    },
    longRow: {
      minWidth: "20rem",
      margin: 0,
      border: "0px none",
    },
  }));