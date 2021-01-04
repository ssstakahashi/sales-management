import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuDrawer from './MenuDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();
  const anchor = 'left'
  const [state, setState] = React.useState({
    top: false,
    // left: false,
    bottom: false,
    right: false,
    [anchor]: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer( anchor, true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Studio Foods 販売管理
          </Typography>
        </Toolbar>
      </AppBar>
      <MenuDrawer  state={state} anchor={anchor} toggleDrawer={toggleDrawer}/>
    </div>
  );
}
