import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DateInput = React.memo((props) => {
  const classes = useStyles();
  console.log(props)

  return (
    <form className={classes.container} noValidate>
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
    </form>
  );
});

export default DateInput;