import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SalesEntry from './SalesEntry';
import Slide from '@material-ui/core/Slide';
import Confirmation from './Confirmation';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SalesDialog = (props) =>{

  return (
      <Dialog open={props.open} onClose={props.handleClose} fullScreen TransitionComponent={Transition}>
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

            <SalesEntry handleClose={props.handleClose} />
           
        </DialogContent>
      </Dialog>
  );
}

export default SalesDialog