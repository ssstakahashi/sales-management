import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SwitchInput = React.memo(({value, onChange, color, label}) => {

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch checked={value} onChange={onChange} color={color}/>}
        label={label}
      />
    </FormGroup>
  );
})

export default SwitchInput;