import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TableContainer,Table,TableHead,TableBody,TableRow, TableCell, Typography, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import _ from 'lodash';
import AccountingEntryStatement from './AccountingEntryStatement'
import { DateInput } from '../../components/uikit';
import { AddStatementOperation, ReduceStatementOperation } from '../../reducks/accounting/operations';
import clsx from 'clsx';

export default function AccountingEntry() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const startYear = '2021'
  const accounting = selector.accountings
  const accountingStatement = selector.accountings.statement
  const [ journalNumber, setJournalNumber ] = useState(accounting.journalNumber)
  const [ journalDate, setJournalDate ] = useState(accounting.journalDate)
  const [ projectCode, setProjectCode ] = useState(accounting.projectCode)

  console.log(accountingStatement)
  console.log(accounting)

  useEffect(()=>{
    const first = startYear.substr( -2 )
    const max = _.maxBy(accounting.rows, 'journalNumber') || 0
    const second = ("00000" + max + 1).slice( -5 )
    setJournalNumber( first + second )
  },[])

  const inputJournalDate = (e) => setJournalDate(e.target.value)
  const inputProjectCode = e => setProjectCode(e.target.value)

  const addStatementOperation = () => {
    dispatch(AddStatementOperation())
  }
  const reduceStatementOperation = () => {
    dispatch(ReduceStatementOperation())
  }

  const HeaderArea = () => (
    <TableHead>
      <TableRow>
        <TableCell align="center" colSpan={4}>借方</TableCell>
        <TableCell align="center" colSpan={4}>貸方</TableCell>
        <TableCell rowSpan={2}>摘要</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center">勘定科目（借方）</TableCell>
        <TableCell align="center">金額</TableCell>
        <TableCell align="center">税金</TableCell>
        <TableCell align="center">取引先</TableCell>
        <TableCell align="center">勘定科目（貸方）</TableCell>
        <TableCell align="center">金額</TableCell>
        <TableCell align="center">税金</TableCell>
        <TableCell align="center">取引先</TableCell>
        {/* <TableCell align="center">摘要</TableCell> */}
      </TableRow>
    </TableHead>
  )
  const FooterArea = () => (
    <TableRow>
      <TableCell>勘定科目（借方）</TableCell>
      <TableCell align="right">金額</TableCell>
      <TableCell align="right">税金</TableCell>
      <TableCell>勘定科目（貸方）</TableCell>
      <TableCell align="right">金額</TableCell>
      <TableCell align="right">税金</TableCell>
    </TableRow>
  )

  const StatementAddArea = () => (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
            <AddCircleIcon
              color="primary"
              style={{ fontSize:"3rem", margin: "1rem 2rem"}}
              onClick={addStatementOperation}
            />
        </Grid>
        <Grid item>
            <RemoveCircleIcon
              color="secondary"
              onClick={reduceStatementOperation}
              className={clsx(classes.iconStyle, accountingStatement.length === 1 && classes.disableColor)}
            />
        </Grid>
      </Grid>
  )

  return (
  <Container>
    <Grid container direction="column" justify="center" alignItems="flex-start" spacing={3}>
        <Grid item container direction="row" justify="flex-start" alignItems="center" spacing={5} xs={12}>
            <Grid item>
                <Typography variant={"h6"}>
                    {`仕訳番号 ${journalNumber}`}
                </Typography>
            </Grid>
            <Grid item>
                <DateInput
                    label={"仕訳日"}
                    value={journalDate}
                    onChange={inputJournalDate}
                />
            </Grid>
            <Grid item>
                <DateInput
                    label={"プロジェクト番号"}
                    value={projectCode}
                    onChange={inputProjectCode}
                />
            </Grid>
        </Grid>

        <Grid item>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              {HeaderArea()}
              <TableBody>
              {accountingStatement.map(( x, index) => {
                const journalCode = journalNumber + ("00" + (index + 1)).slice( -2 )
                console.log(journalCode)
                return (
                <AccountingEntryStatement
                  key={journalCode}
                  x={x}
                  index={index}
                  journalCode={journalCode}
                />
                )
              })}
              {FooterArea()}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
             {StatementAddArea()}
        </Grid>
    </Grid>
  </Container>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
    },
    table: {
      minWidth: 700,
    },

    iconStyle: {
      fontSize:"3rem",
      margin: "1rem 2rem",
      // backgroundColor: theme.palette.grey.A100,
    },
    disableColor: {
      color: theme.palette.grey[200],
    },
  }));