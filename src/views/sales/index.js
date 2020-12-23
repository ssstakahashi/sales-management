import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { salesDataGetOperation, salesDialogCloseOperation, salesDialogOpenOperation } from '../../reducks/sales/operations';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SalesDialog from './SalesDialog'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Sales = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state.sales);
  const rows = selector.rows

  const handleClickOpen = (row) => {
    dispatch( salesDialogOpenOperation(row) )
  }

  const handleClose = () => {
    dispatch( salesDialogCloseOperation() )
  }

  useEffect(()=>{
    if ( rows.length === 0 ) dispatch( salesDataGetOperation() )
  },[])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SalesDialog handleClose={handleClose} open={selector.open}/>
      <AddCircleIcon color="secondary" style={{ fontSize:"3rem", margin: "1rem 2rem"}} onClick={()=>handleClickOpen({})}/>
    </TableContainer>
  );
}

export default Sales;