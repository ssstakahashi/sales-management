import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProductEntry from './ProductEntry';

const ProductDialog = (props) =>{

  return (
      <Dialog open={props.open} onClose={props.handleClose} fullScreen>
        <DialogTitle>商品登録</DialogTitle>
        <DialogContent>
            <ProductEntry handleClose={props.handleClose}/>
        </DialogContent>
      </Dialog>
  );
}

export default ProductDialog