import { RootState } from '../rootReducer';
import { SnackbarState } from './SnackbarState';

export const getIsSidebarOpened: (state: RootState) => boolean = (state: RootState) => state.settings.isSidebarOpened;
export const getSnackbarState: (state: RootState) => SnackbarState = (state: RootState) => state.settings.snackbar;
