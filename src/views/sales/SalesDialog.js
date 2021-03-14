import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SalesEntry from './SalesEntry';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SalesDialog = (props) =>{

  return (
      <Dialog open={props.open} onClose={props.handleClose} fullScreen TransitionComponent={Transition} style={{width: "80%", margin: "0 auto"}}>
        <DialogTitle>売上登録</DialogTitle>
        <DialogContent>

            <SalesEntry handleClose={props.handleClose} />

        </DialogContent>
      </Dialog>
  );
}

export default SalesDialog