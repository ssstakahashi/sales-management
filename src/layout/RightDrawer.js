import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function RightDrawer({ state, anchor, toggleDrawer}) {
  const classes = useStyles();
  console.log(state)
  console.log(anchor)

  const list = () => {
    <div
      className={classes.list}
      onClick={toggleDrawer( anchor, false)}
      onKeyDown={toggleDrawer( anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  }

  return (
    <React.Fragment>
      <SwipeableDrawer anchor={anchor} open={state[anchor]}
        onClose={toggleDrawer( anchor, false )}
        onOpen={toggleDrawer(anchor, true)}
      >
      {console.log(state[anchor])}
        {list(anchor)}
      </SwipeableDrawer>
    </React.Fragment>
  )
}
