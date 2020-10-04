import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { config } from '../../config';
import { useStyles } from './styles';
import { EnhancedTableHead } from './EnhancedTableHead';
import { Order } from './model';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import { getComparator, stableSort } from './util-functions';
import { UserRow } from './UserRow';
import { getFilteredUsers, getShowSpinner, hasLoadingError } from '../../store/users/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../store/users/user';
import { UsersTableHead } from './UsersTableHead';
import { UsersDetails } from './UserDetails';
import { selectUser } from '../../store/users/actions';
import { CircularProgress } from '@material-ui/core';

export const UsersTable: React.FC = () => {
  const dispatch = useDispatch();
  const handleUserSelect = (user: User) => dispatch(selectUser(user));
  const users = useSelector(getFilteredUsers);
  const hasUsersLoadingError = useSelector(hasLoadingError);
  const showSpinner = useSelector(getShowSpinner);
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof User>('id');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(config.tableElementsSize);
  const tableElementsSize = users.length >= rowsPerPage ? rowsPerPage : users.length;
  const rowsPerPageOptions = Array.from(new Set([5, 10, 25, 50, tableElementsSize])).sort((a, b) => (a > b ? -1 : 1));

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows = tableElementsSize - Math.min(tableElementsSize, users.length - page * tableElementsSize);
  const tableContent = (
    <>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={users.length}
          />
          <TableBody>
            {stableSort<User>(users, getComparator<User>(order, orderBy))
              .slice(page * tableElementsSize, page * tableElementsSize + tableElementsSize)
              .map((row, index) => (
                <UserRow
                  labelId={`enhanced-table-checkbox-${index}`}
                  row={row}
                  key={row.firstName + row.id}
                  onClick={handleUserSelect}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={users.length}
        rowsPerPage={tableElementsSize}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );

  const getContent = () => {
    if (showSpinner) {
      return (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      );
    }

    if (hasUsersLoadingError) {
      return <div className={classes.emptyBlock}>Не удалось загрузить пользователей :(</div>;
    }

    if (!users.length) {
      return <div className={classes.emptyBlock}>Ничего не найдено :(</div>;
    }

    return tableContent;
  };

  return (
    <div className={classes.root}>
      <UsersTableHead />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        {getContent()}
      </Paper>
      {!!users.length && (
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
      )}
      <UsersDetails />
    </div>
  );
};
