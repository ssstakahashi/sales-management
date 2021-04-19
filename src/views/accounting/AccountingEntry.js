import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TableContainer,Table,TableHead,TableBody,TableRow, TableCell, Typography, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import _ from 'lodash';
import AccountingEntryStatement from './AccountingEntryStatement'
import { DateInput, MainButton } from '../../components/uikit';
import { AddStatementOperation, ReduceStatementOperation } from '../../reducks/accounting/operations';
import clsx from 'clsx';

export default function AccountingEntry() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const startYear = '2021'
  const accounting = selector.accountings.state
  const accountingStatement = selector.accountings.state.statement
  const [ journalNumber, setJournalNumber ] = useState(accounting.journalNumber)
  const [ journalDate, setJournalDate ] = useState(accounting.journalDate)
  const [ projectCode, setProjectCode ] = useState(accounting.projectCode)

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
        <TableCell align="center" colSpan={3} size="small">借方</TableCell>
        <TableCell align="center" colSpan={3} size="small">貸方</TableCell>
        <TableCell rowSpan={2} size="small">摘要</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" size="small">勘定科目（借方）</TableCell>
        <TableCell align="center" size="small">金額</TableCell>
        <TableCell align="center" size="small">税金</TableCell>
        {/* <TableCell align="center" size="small">取引先</TableCell> */}
        <TableCell align="center" size="small">勘定科目（貸方）</TableCell>
        <TableCell align="center" size="small">金額</TableCell>
        <TableCell align="center" size="small">税金</TableCell>
        {/* <TableCell align="center" size="small">取引先</TableCell> */}
        {/* <TableCell align="center">摘要</TableCell> */}
      </TableRow>
    </TableHead>
  )
  const FooterArea = () => (
    <TableRow>
      <TableCell size="small">勘定科目（借方）</TableCell>
      <TableCell align="right" size="small">金額</TableCell>
      <TableCell align="right" size="small">税金</TableCell>
      <TableCell size="small">勘定科目（貸方）</TableCell>
      <TableCell align="right" size="small">金額</TableCell>
      <TableCell align="right" size="small">税金</TableCell>
    </TableRow>
  )

  const StatementAddArea = () => (
      <>
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
      </>
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

        <Grid item container direction="row" justify="center" xs={12}>
             {StatementAddArea()}
        </Grid>
        <Grid item container direction="row" justify="center" spacing={8}>
          <Grid item>
            <MainButton label={"登録"} color="primary" onClick={""} />
          </Grid>
          <Grid item>
            <MainButton label={"戻る"} color="secondary" onClick={""}/>
          </Grid>
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