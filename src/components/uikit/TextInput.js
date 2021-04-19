import React from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme)=>({
    full: {
        // marginBottom: 16,
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottome: theme.spacing(1),
        marginLeft: theme.spacing(1),
        padding: 0,
        width: "100vh",
    },
    half: {
        margin: theme.spacing(1),
        // marginLeft: 8,
        // marginRight: 8,
        // marginBottom: 16,
        minWidth: 100,
        maxWidth: 120,
    },
    default: {
        margin: theme.spacing(1),
        width: "100%",
        minWidth : 240,
    },
}))

const TextInput = React.memo(({
    fullWidth = false,
    label,
    multiline = false,
    required = false,
    rows = 1,
    value,
    name,
    autoComplete = "off",
    type ="text",
    onChange,
    variant = "standard",
    styleClass,
}) => {
    const classes = useStyles();
    let textStyle = ""
    if ( !fullWidth ) {
        if ( styleClass ) {
            textStyle = classes.default 
        } else {
            textStyle = classes.half
        }
    } else {
        textStyle = classes.full
    }

    return (
        <TextField
            className={textStyle}
  
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