import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, TextField } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { AccountList, TaxClassificationList } from './master';
import { TableContainer,Table,TableHead,TableBody,TableRow, TableCell} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import initialState from '../../reducks/store/initialState';
import { FindSupplier } from '../../components/function';
import { SupplierFirebaseDatabase } from '../../reducks/supplier/firebaseFunction';
import { StatusChangeOperation } from '../../reducks/accounting/operations';

const filter = createFilterOptions();

export default function AccountingEntryStatement(props) {
  const classes = useStyles();
  const { journalCode, x, index } = props;
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const accounting = selector.accountings.statement[index]
  const suppliersList = selector.suppliers.rows

  const [ debitAccount, setDebitAccount ] = useState(x.debitAccount)
  const [ debitAmount, setDebitAmount ] = useState(x.debitAmount)
  const [ debitTax, setDebitTax ] = useState(x.debitTax)
  const [ debitSupplierId, setDebitSupplierId ] = useState(x.debitSupplierId)
  const [ debitSupTemporaryName, setDebitSupTemporaryName ] = useState(x.debitSupTemporaryName)
  const [ debitItems, setDebitItems ] = useState(x.debitItems)
  const [ debitMemo, setDebitMemo ] = useState(x.debitMemo)
  const [ debitDepartment, setDebitDepartment ] = useState(x.debitDepartment)
  const [ creditAccount, setCreditAccount ] = useState(x.creditAccount)
  const [ creditAmount, setCreditAmount ] = useState(x.creditAmount)
  const [ creditTax, setCreditTax ] = useState(x.creditTax)
  const [ creditSupplierId, setCreditSupplierId ] = useState(x.creditSupplierId)
  const [ creditSupTemporaryName, setCreditSupTemporaryName ] = useState(x.creditSupTemporaryName)
  const [ creditItems, setCreditItems ] = useState(x.creditItems)
  const [ creditMemo, setCreditMemo ] = useState(x.creditMemo)
  const [ creditDepartment, setCreditDepartment ] = useState(x.creditDepartment)
  const [ description, setDescription ] = useState(x.description)

  const [ debitSupplier, setDebitSupplier ] = useState(FindSupplier(x.debitSupplierId) || SupplierFirebaseDatabase(initialState.suppliers))
  const [ creditSupplier, setCreditSupplier ] = useState(FindSupplier(x.creditSupplierId) || SupplierFirebaseDatabase(initialState.suppliers))

  const inputDebitAccount = (e) => {
    setDebitAccount(e.target.value)
    const row = {...accounting, debitAccount : e.target.value }
    dispatch(StatusChangeOperation( row ,index))
  }
  const inputDebitAmount = (e) => {
    if ( e.target.value >= 0) {
      setDebitAmount(e.target.value)
      const row = {...accounting, debitAmount : e.target.value }
      dispatch(StatusChangeOperation( row ,index))
    }
  }
  const inputDebitTax = (e) => {
    setDebitTax(e.target.value)
    const row = {...accounting, debitTax : e.target.value }
    dispatch(StatusChangeOperation( row ,index))
  }
  const inputCreditAccount = (e) => {
    setCreditAccount(e.target.value)
    const row = {...accounting, creditAccount : e.target.value }
    dispatch(StatusChangeOperation( row ,index))
  }
  const inputCreditAmount = (e) => {
    if ( e.target.value >= 0) {
      setCreditAmount(e.target.value)
      const row = {...accounting, creditAmount : e.target.value }
      dispatch(StatusChangeOperation( row ,index))
    }
  }
  const inputCreditTax = (e) => {
    setCreditTax(e.target.value)
    const row = {...accounting, creditTax : e.target.value }
    dispatch(StatusChangeOperation( row ,index))
  }
  const inputDescription = (e) => {
    setDescription(e.target.value)
    const row = {...accounting, description : e.target.value }
    dispatch(StatusChangeOperation( row ,index))
  }

  const DebitArea = () => (
    <>
      <TableCell>
          <Select label="勘定科目" onChange={inputDebitAccount} value={debitAccount} size="small">
          {AccountList.map((y)=> (
            <MenuItem key={y.id} value={y.id}>{y.name}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell>
          <TextField onChange={inputDebitAmount} value={debitAmount} variant='outlined' type='number' size="small"/>
      </TableCell>
      <TableCell>
          <Select label="税区分" onChange={inputDebitTax} value={debitTax} size="small">
          {TaxClassificationList.map((y,index)=> (
            <MenuItem key={index} value={y}>{y}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell>
          {SupplierCreateInput(debitSupplier, setDebitSupplier)}
      </TableCell>
    </>
  )

  const CreditArea = () => (
    <>
      <TableCell>
          <Select label="勘定科目" onChange={inputCreditAccount} value={creditAccount} size="small">
          {AccountList.map((y)=> (
            <MenuItem key={y.id} value={y.id}>{y.name}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell>
          <TextField onChange={inputCreditAmount} value={creditAmount} variant='outlined' type='number' size="small"/>
      </TableCell>
      <TableCell>
          <Select label="税区分" onChange={inputCreditTax} value={creditTax} size="small">
          {TaxClassificationList.map((y,index)=> (
            <MenuItem key={index} value={y}>{y}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell>
          {SupplierCreateInput(creditSupplier, setCreditSupplier)}
      </TableCell>
    </>
  )
  const DebitSecondArea = () => (
    <>
    <TableCell>
    </TableCell>
    <TableCell>
    </TableCell>
    <TableCell>
    </TableCell>
    <TableCell>
    </TableCell>
    </>
  )
  const CreditSecondArea = () => (
    <>
     <TableCell>
    </TableCell>
     <TableCell>
    </TableCell>
     <TableCell>
    </TableCell>
     <TableCell>
    </TableCell>
    </>
  )
  
  function SupplierCreateInput(supplier, setSupplier) {
    return (
      <Autocomplete
        value={supplier}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setSupplier({...supplier, supTemporaryName: newValue });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setSupplier({...supplier, supTemporaryName: newValue.inputValue });
          } else {
            setSupplier({ ...supplier, ...newValue });
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              supTemporaryName: `新規取引先 "${params.inputValue}"`,
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={suppliersList}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option.supTemporaryName;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.supTemporaryName;
        }}
        renderOption={(option) => option.supTemporaryName}
        style={{ width: 100, fontSize:"0.5rem" }}
        freeSolo
        size="small"
        renderInput={(params) => (
          <TextField {...params} variant="outlined" />
        )}
      />
    );
  }
  return (
  <TableRow hover>
      <TableCell colSpan={9}>
          <TableRow>
              {DebitArea()}
              {CreditArea()}
              <TableCell rowSpan={2}>
                <TextField value={description} variant="outlined" type="text" onChange={inputDescription}/>
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={8}>
              {DebitSecondArea()}
              {CreditSecondArea()}
            </TableCell>
          </TableRow>
      </TableCell>
  </TableRow>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
    },
    paperInner: {
      width: "100%",
      padding: "2rem",
    },
  }));