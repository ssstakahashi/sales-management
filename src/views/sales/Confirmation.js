import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  container: {
    minWidth: 650,
  },
});

const Confirmation = (props) =>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state.sales);

  return (
      <Dialog open={selector.confirmationOpen} onClose={props.handleClose} TransitionComponent={Transition} className={classes.container}>
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            本当に登録していいですか？
          </DialogContentText>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary" >
            Disagree
            </Button>
            <Button  onClick={props.submitDispatch} color="primary" autoFocus>
            Agree
            </Button>
        </DialogActions>
    

        </DialogContent>
      </Dialog>
  );
}

export default Confirmation