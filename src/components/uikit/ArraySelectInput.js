import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    textAlign: "center",
  },
  formControlHalf: {
    margin: theme.spacing(1),
    minWidth: 80,
    textAlign: "center",
  },

}));

const ArraySelectInput = React.memo(({ label, onChange, value, selectArray, variant, styles }) => {
  const classes = useStyles();

  return (
      <FormControl className={ !styles ? classes.formControl : classes.formControlHalf}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          variant={variant}
          type="number"
        >
        {selectArray.map((x)=> (
          <MenuItem key={x} value={x}>{x}</MenuItem>
        ))}
        </Select>
      </FormControl>
  );
});

export default ArraySelectInput;
