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

const filter = createFilterOptions();

export default function AccountingEntryStatement(props) {
  const classes = useStyles();
  const { journalCode, x } = props;
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
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
  const [ supplier, setSupplier ] = useState(FindSupplier(x.supplierId) || SupplierFirebaseDatabase(initialState.suppliers))

  const inputDebitAccount = (e) => setDebitAccount(e.target.value)
  const inputDebitAmount = (e) => setDebitAmount(e.target.value)
  const inputDebitTax = (e) => setDebitTax(e.target.value)
  const inputCreditAccount = (e) => setCreditAccount(e.target.value)
  const inputCreditAmount = (e) => setCreditAmount(e.target.value)
  const inputCreditTax = (e) => setCreditTax(e.target.value)

  const DebitArea = () => (
    <>
      <TableCell>
          <Select label="勘定科目" onChange={inputDebitAccount} value={debitAccount}>
          {AccountList.map((y)=> (
            <MenuItem key={y.id} value={y.id}>{y.name}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell>
          <TextField onChange={inputDebitAmount} value={debitAmount} variant='outlined' type='number' />
      </TableCell>
      <TableCell>
          <Select label="税区分" onChange={inputDebitTax} value={debitTax}>
          {TaxClassificationList.map((y,index)=> (
            <MenuItem key={index} value={y}>{y}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell>
      </TableCell>
    </>
  )

  const CreditArea = () => (
    <>
      <TableCell>
          <Select label="勘定科目" onChange={inputCreditAccount} value={creditAccount}>
          {AccountList.map((y)=> (
            <MenuItem key={y.id} value={y.id}>{y.name}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell>
          <TextField onChange={inputCreditAmount} value={creditAmount} variant='outlined' type='number' />
      </TableCell>
      <TableCell>
          <Select label="税区分" onChange={inputCreditTax} value={creditTax}>
          {TaxClassificationList.map((y,index)=> (
            <MenuItem key={index} value={y}>{y}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell>
      </TableCell>
    </>
  )
  function SupplierCreateInput() {

    return (
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            supplier({
              supTemporaryName: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              supTemporaryName: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
  
          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
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
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.supTemporaryName;
        }}
        renderOption={(option) => option.supTemporaryName}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="取引先" variant="outlined" />
        )}
      />
    );
  }
  return (
  <TableRow>
    {DebitArea()}
    {CreditArea()}
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