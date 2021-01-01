import React, { useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { SalesReportTableHeader, SalesReportTableToolbar } from './SalesHeader';
import SalesReportTableBody from './SalesBody';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: '主体' },
  { id: 'name', numeric: false, disablePadding: false, label: '取引先' },
  { id: 'name', numeric: false, disablePadding: false, label: '1月' },
  { id: 'calories', numeric: true, disablePadding: false, label: '2月' },
  { id: 'fat', numeric: true, disablePadding: false, label: '3月' },
  { id: 'carbs', numeric: true, disablePadding: false, label: '4月' },
  { id: 'protein', numeric: true, disablePadding: false, label: '5月' },
  { id: 'protein', numeric: true, disablePadding: false, label: '6月' },
  { id: 'protein', numeric: true, disablePadding: false, label: '7月' },
  { id: 'protein', numeric: true, disablePadding: false, label: '8月' },
  { id: 'protein', numeric: true, disablePadding: false, label: '9月' },
  { id: 'protein', numeric: true, disablePadding: false, label: '10月' },
  { id: 'protein', numeric: true, disablePadding: false, label: '11月' },
  { id: 'protein', numeric: true, disablePadding: false, label: '12月' },
  { id: 'protein', numeric: true, disablePadding: false, label: '合計' },
];

export default function SalesTableIndex() {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

// 全項目チェック済みとする。
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

// ページ遷移
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

// １ページに表示する項目数（第二引数は10進数表記を指定）
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <SalesReportTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <SalesReportTableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <SalesReportTableBody
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              rows={rows}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));