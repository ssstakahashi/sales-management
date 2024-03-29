import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
    width: 140,
  },
}));

const DateInput = React.memo((props) => {
  const classes = useStyles();

  return (

      <TextField
        label={props.label}
        type="date"
        className={classes.textField}
        value={props.value}
        onChange={props.onChange}
        InputLabelProps={{
            shrink: true,
        }}
      />

  );
});

export default DateInput;