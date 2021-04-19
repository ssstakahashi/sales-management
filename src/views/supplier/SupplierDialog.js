import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SupplierEntry from './SupplierEntry';
import { SupplierDialogCloseOperation } from '../../reducks/supplier/operations';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SupplierDialog = () =>{
  // const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const open = selector.dialogs.suppliers
  const handleClose = () => dispatch( SupplierDialogCloseOperation() )

  return (
      <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
        <DialogTitle>取引先登録</DialogTitle>
        <DialogContent>
            <SupplierEntry />
        </DialogContent>
      </Dialog>
  );
}

export default SupplierDialog