import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router'
import { supplierInputOperation } from '../../reducks/supplier/operations';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const Supplier = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const [ state, setState ] = useState({...selector.supplier});

  const onChangeSet = useCallback((e) => {
      setState({...state, [e.target.name] : e.target.value })
    },[state])

  return (
    <form className={classes.root} autoComplete="off">
      <div>
        <TextField required label="Required" defaultValue="Hello World" />
        <TextField
          value={state.supplierName}
          label="取引先"
          name="supplierName"
          onChange={onChangeSet}
        />
        <TextField
          label="金額"
          type="number"
          name="supplierId"
          value={state.supplierId}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChangeSet}
        />
      </div>
      <button onClick={()=>dispatch(supplierInputOperation(state))}>
        登録
      </button>
      <button onClick={()=>dispatch(push('/'))}>
        戻る
      </button>
    </form>
  )

};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default Supplier;