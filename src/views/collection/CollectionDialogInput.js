import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CollectionEntry from './CollectionEntry';
import Slide from '@material-ui/core/Slide';
import { DialogCloseOperation } from '../../reducks/dialog/operations';
import { useDispatch, useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CollectionDialogInput() {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const open = selector.dialogs.collections

  return (
      <Dialog open={open} onClose={()=>dispatch(DialogCloseOperation('collections'))} fullScreen TransitionComponent={Transition}>
        <DialogTitle>請求登録</DialogTitle>
        <DialogContent>

            <CollectionEntry />

        </DialogContent>
      </Dialog>
  );
}