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
  },
  formControlHalf: {
    margin: theme.spacing(1),
    minWidth: 80,
  },

}));

const SelectInput = React.memo(({ label, onChange, value, selectArray, selectValue, selectList, variant, styles }) => {
  const classes = useStyles();

  return (
      <FormControl className={ !styles ? classes.formControl : classes.formControlHalf}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          variant={variant}
        >
        {selectArray.map((x)=> (
          <MenuItem key={x[selectValue]} value={x[selectValue]}>{x[selectList]}</MenuItem>
        ))}
        </Select>
      </FormControl>
  );
});

export default SelectInput;
