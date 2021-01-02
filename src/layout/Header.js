import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RightDrawer from './RightDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

export default function Header() {
  const classes = useStyles();
  // const [ right, setRight ] = useState( false );
  const anchor = "left"
  const [state, setState] = useState({
    [anchor]: false,
  });
  const toggleDrawer = ( anchor, open ) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ [anchor]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer( anchor, true )}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <RightDrawer state={state} toggleDrawer={toggleDrawer} anchor={anchor} />
    </div>
  );
}
