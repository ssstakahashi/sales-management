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
  console.log(journalCode)
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const accounting = selector.accountings.statement[index]
  const suppliersList = selector.suppliers.rows

  const [ debitAccount, setDebitAccount ] = useState(x.debitAccount)
  const [ debitAmount, setDebitAmount ] = useState(x.debitAmount)
  const [ debitTax, setDebitTax ] = useState(x.debitTax)
  const [ debitSupplierId, setDebitSupplierId ] = useState(x.debitSupplierId)

  const [ debitItemId, setDebitItemId ] = useState(x.debitItemId)
  const [ debitMemoId, setDebitMemoId ] = useState(x.debitMemoId)
  const [ debitDepartmentId, setDebitDepartmentId ] = useState(x.debitDepartmentId)
  const [ creditAccount, setCreditAccount ] = useState(x.creditAccount)
  const [ creditAmount, setCreditAmount ] = useState(x.creditAmount)
  const [ creditTax, setCreditTax ] = useState(x.creditTax)
  const [ creditSupplierId, setCreditSupplierId ] = useState(x.creditSupplierId)

  const [ creditItemId, setCreditItemId ] = useState(x.creditItemId)
  const [ creditMemoId, setCreditMemoId ] = useState(x.creditMemoId)
  const [ creditDepartmentId, setCreditDepartmentId ] = useState(x.creditDepartmentId)
  const [ description, setDescription ] = useState(x.description)

  const [ debitSupplier, setDebitSupplier ] = useState(FindSupplier(x.debitSupplierId) || SupplierFirebaseDatabase(initialState.suppliers))
  const [ creditSupplier, setCreditSupplier ] = useState(FindSupplier(x.creditSupplierId) || SupplierFirebaseDatabase(initialState.suppliers))
  const [ debitItem, setDebitItem ] = useState()
  const [ creditItem, setCreditItem ] = useState()
  const [ debitMemo, setDebitMemo ] = useState()
  const [ creditMemo, setCreditMemo ] = useState()
  const [ debitDepartment, setDebitDepartment ] = useState()
  const [ creditDepartment, setCreditDepartment ] = useState()

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
  const inputOnchage = ((event, newValue, state, setState, objValue, id, setId) => {
      const Id = newValue[id]
      if (typeof newValue === 'string') {
        setState({...state, [objValue]: newValue[id] });
        setId(Id)
      } else if (newValue && newValue.inputValue) {
        // Create a new value from the user input
        setState({...state, [objValue]: newValue.inputValue });
        setId(Id)
      } else {
        setState({ ...state, ...newValue });
        setId(Id)
      }
  })

  const DebitArea = () => (
    <>
      <TableCell size="small">
          <Select label="勘定科目" onChange={inputDebitAccount} value={debitAccount} size="small">
          {AccountList.map((y)=> (
            <MenuItem key={y.id} value={y.id}>{y.name}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell size="small">
          <TextField onChange={inputDebitAmount} value={debitAmount} variant='outlined' type='number' size="small"/>
      </TableCell>
      <TableCell size="small">
          <Select label="税区分" onChange={inputDebitTax} value={debitTax} size="small">
          {TaxClassificationList.map((y,index)=> (
            <MenuItem key={index} value={y}>{y}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell size="small">
          {DataCreateInput(debitSupplier, setDebitSupplier, suppliersList, inputOnchage, 'supTemporaryName', 'supplierId', setDebitSupplierId)}
      </TableCell>
    </>
  )

  const CreditArea = () => (
    <>
      <TableCell size="small">
          <Select label="勘定科目" onChange={inputCreditAccount} value={creditAccount} size="small">
          {AccountList.map((y)=> (
            <MenuItem key={y.id} value={y.id}>{y.name}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell size="small">
          <TextField onChange={inputCreditAmount} value={creditAmount} variant='outlined' type='number' size="small"/>
      </TableCell>
      <TableCell size="small">
          <Select label="税区分" onChange={inputCreditTax} value={creditTax} size="small">
          {TaxClassificationList.map((y,index)=> (
            <MenuItem key={index} value={y}>{y}</MenuItem>
          ))}
          </Select>
      </TableCell>
      <TableCell size="small">
          {DataCreateInput(creditSupplier, setCreditSupplier, suppliersList, inputOnchage, 'supTemporaryName', 'supplierId', setCreditSupplierId )}
      </TableCell>
    </>
  )
  const DebitSecondArea = () => (
    <>
    <TableCell>
    {/* {DataCreateInput(creditSupplier, setCreditSupplier, suppliersList, inputOnchage )} */}
    </TableCell>
    <TableCell>
    {/* {DataCreateInput(creditSupplier, setCreditSupplier, suppliersList, inputOnchage )} */}
    </TableCell>
    <TableCell>
    {/* {DataCreateInput(creditSupplier, setCreditSupplier, suppliersList, inputOnchage )} */}
    </TableCell>
    <TableCell>
    </TableCell>
    </>
  )
  const CreditSecondArea = () => (
    <>
     <TableCell>
     {/* {DataCreateInput(creditSupplier, setCreditSupplier, suppliersList, inputOnchage )} */}
    </TableCell>
     <TableCell>
     {/* {DataCreateInput(creditSupplier, setCreditSupplier, suppliersList, inputOnchage )} */}
    </TableCell>
     <TableCell>
     {/* {DataCreateInput(creditSupplier, setCreditSupplier, suppliersList, inputOnchage )} */}
    </TableCell>
     <TableCell>
    </TableCell>
    </>
  )
  
  
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

  function DataCreateInput(state, setState, optionsList, onChange, objValue, id, setId) {
    return (
      <Autocomplete
        value={state}
        onChange={(event, newValue)=>onChange(event, newValue, state, setState, objValue, id, setId)}
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
        options={optionsList}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option[objValue];
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option[objValue];
        }}
        renderOption={(option) => option[objValue]}
        style={{ width: 70, fontSize:"0.5rem" }}
        freeSolo
        size="small"
        renderInput={(params) => (
          <TextField {...params} variant="outlined" />
        )}
      />
    );
  }