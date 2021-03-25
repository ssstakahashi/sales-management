import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@material-ui/core";
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
    createStyles({
        "buttonStyleMain": {
            fontSize: 16,
            height: 48,
            marginBottom: 16,
            width: 256,
        },
        "primary": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            }
        },
        "primaryLight": {
            backgroundColor: theme.palette.primary.main.light,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.primary,
            }
        },
        "primaryDark": {
            backgroundColor: theme.palette.primary.main.Dark,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.light,
            }
        },
        "secondary": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.secondary.light,
            }
        },
        "secondaryLight": {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.secondary,
            }
        },
        "secondaryDark": {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.secondary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.secondary.light,
            }
        },
        "third": {
            backgroundColor: theme.palette.third.main,
            color: theme.palette.third.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.third.light,
            }
        },
    })
)


const MainButton = React.memo((props) => {
    const classes = useStyles()
    return (
        <Button
            className={clsx(classes.buttonStyleMain, true && classes[props.color])}
            variant="contained"
            onClick={() => props.onClick()}
        >
            {props.label}
        </Button>
    );
});

export default MainButton;

// function ColorSelect(classes) {
//     switch (classes) {
//         case 'primary':
//             return;
//         case 'primaryLight':
//             return;
//         case 'primaryDark':
//             return;
//         case 'secondary':
//             return;
//         case 'secondaryLight':
//             return;
//         case 'secondaryDark':
//             return;
//         case 'third':
//             return;
//         case 'thirdLight':
//             return;
//         case 'thirdDark':
//             return;
//         default:
//             return;
//     }
// }
