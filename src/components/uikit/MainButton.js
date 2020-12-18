import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
    createStyles({
        "primaryButton": {
            // backgroundColor: theme.palette.primary.main,
            color: '#000',
            fontSize: 16,
            height: 48,
            marginBottom: 16,
            width: 256,
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            }
        },
        "secondaryButton": {
            backgroundColor: theme.palette.secondary.main,
            color: '#000',
            fontSize: 16,
            height: 48,
            marginBottom: 16,
            width: 256,
            "&:hover": {
                backgroundColor: theme.palette.secondary.light,
            }
        }
    })
)

const MainButton = React.memo((props) => {
    const classes = useStyles()
    console.log("ボタン！！")
    return (
        <Button
            className={props.color === "primary" ? classes.primaryButton : classes.secondaryButton}
            // color={props.color}
            variant="contained"
            onClick={() => props.onClick()}
        >
            {props.label}
        </Button>
    );
});

export default MainButton;