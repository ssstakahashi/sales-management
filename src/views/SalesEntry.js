import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'
import { salesInputOperation } from '../reduxs/sales/operations';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const SalesEntry = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  return (
    <form className={classes.root} autoComplete="off">
      <div>
        <TextField required label="Required" defaultValue="Hello World" />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
      <button onClick={()=>dispatch(salesInputOperation())}>
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

export default SalesEntry;