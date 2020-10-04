import { action } from 'typesafe-actions';
import { HIDE_SNACKBAR, SHOW_SNACKBAR, TOGGLE_SIDEBAR } from './actionTypes';
import { SnackbarState } from './SnackbarState';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toggleSidebar = () => action(TOGGLE_SIDEBAR);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const showSnackbar = (options: Partial<SnackbarState>) => action(SHOW_SNACKBAR, options);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const hideSnackbar = () => action(HIDE_SNACKBAR);
