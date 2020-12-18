import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SupplierEntry from './SupplierEntry';

const SupplierDialog = (props) =>{

  return (
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
            <SupplierEntry handleClose={props.handleClose}/>
        </DialogContent>
      </Dialog>
  );
}

export default SupplierDialog