import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { DialogCloseOperation } from '../../reducks/dialog/operations';
import AccountingEntry from './AccountingEntry';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AccountingDialog = () =>{
  // const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  // const accounting = selector.accountings
  const open = selector.dialogs.accountings
  const handleClose = () => {
    dispatch(DialogCloseOperation('accountings'))
  }

  return (
      <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
        <DialogTitle>仕訳登録</DialogTitle>
        <DialogContent>

            <AccountingEntry />

        </DialogContent>
      </Dialog>
  );
}

export default AccountingDialog