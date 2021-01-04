import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function MenuDrawer({ anchor, state, toggleDrawer }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const list = (anchor) => (
    <div
      className={classes.list}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button onClick={()=>dispatch(push('/'))}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
              {/* <MailIcon /> */}
            <ListItemText primary={'Home'} />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button onClick={()=>dispatch(push('/electors'))}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
              {/* <MailIcon /> */}
            <ListItemText primary={'Electors'} />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button onClick={()=>dispatch(push('/supplier'))}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
              {/* <MailIcon /> */}
            <ListItemText primary={'Supplier'} />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button onClick={()=>dispatch(push('/map'))}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
              {/* <MailIcon /> */}
            <ListItemText primary={'Map'} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
