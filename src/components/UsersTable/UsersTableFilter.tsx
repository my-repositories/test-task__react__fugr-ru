import { Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../store/users/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const UsersTableFilter: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [filterText, setFilterText] = useState('');
  const handleFilterTextChange = (event: any) => setFilterText(event.target.value);
  const filterUsers = (event: any) => {
    event.preventDefault();
    dispatch(setFilter(filterText));
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={filterUsers}>
      <InputBase
        className={classes.input}
        placeholder="Поиск пользователя"
        inputProps={{ 'aria-label': 'Поиск пользователя' }}
        value={filterText}
        onChange={handleFilterTextChange}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
