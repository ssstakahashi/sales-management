import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router'
import { salesInputOperation } from '../reduxs/sales/operations';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const Sales = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const [ state, setState ] = useState({...selector.sales});

  const onChangeSet = useCallback((e) => {
      setState({...state, [e.target.name] : e.target.value })
    },[state])

  return (
    <form className={classes.root} autoComplete="off">
      <div>
        <TextField required label="Required" defaultValue="Hello World" />
        <TextField
          value={state.proName}
          label="取引先"
          name="proName"
          onChange={onChangeSet}
        />
        <TextField
          label="金額"
          type="number"
          name="amount"
          value={state.amount}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChangeSet}
        />
      </div>
      <button onClick={()=>dispatch(salesInputOperation(state))}>
        登録
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

export default Sales;