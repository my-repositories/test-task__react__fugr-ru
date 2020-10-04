import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Content } from './Content';
import { Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getSnackbarState } from '../store/settings/selectors';
import { hideSnackbar } from '../store/settings/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarState = useSelector(getSnackbarState);
  const handleClose = () => dispatch(hideSnackbar());

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: snackbarState.vertical, horizontal: snackbarState.horizontal }}
        autoHideDuration={5 * 1000}
        open={snackbarState.opened}
        onClose={handleClose}
        onClick={handleClose}
        message={snackbarState.text}
        key={snackbarState.vertical + snackbarState.horizontal}
      />
      <CssBaseline />
      <Header />
      <Sidebar />
      <Content />
    </div>
  );
};
