import React from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    full: {
        // marginBottom: 16,
        width: "100%",
        minWidth: 240,
    },
    half: {
        marginLeft: 8,
        marginRight: 8,
        // marginBottom: 16,
        minWidth: 80,

    }
})

const TextInput = React.memo(({
    fullWidth = true,
    label, multiline = false,
    required = false,
    rows = 1,
    value,
    name,
    autoComplete = "off",
    type ="text",
    onChange,
    variant
}) => {
    const classes = useStyles();
    const textStyle = fullWidth ? classes.full : classes.half;

    return (
        <TextField
            className={textStyle}
            fullWidth={fullWidth}
            label={label}
            margin="dense"
            multiline={multiline}
            required={required}
            rows={rows}
            value={value}
            name={name}
            autoComplete={autoComplete}
            type={type}
            onChange={onChange}
            variant={variant}
        />
    );
});

export default TextInput;