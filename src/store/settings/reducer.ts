import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { HIDE_SNACKBAR, SHOW_SNACKBAR, TOGGLE_SIDEBAR } from './actionTypes';
import { SnackbarState } from './SnackbarState';

export type SettingsAction = ActionType<typeof actions>;

export type SettingsState = Readonly<{
  isSidebarOpened: boolean;
  snackbar: SnackbarState;
}>;
const initialState: SettingsState = {
  isSidebarOpened: true,
  snackbar: {
    text: '',
    horizontal: 'right',
    vertical: 'top',
    opened: false,
  },
};

export default combineReducers<SettingsState, SettingsAction>({
  isSidebarOpened: (state = initialState.isSidebarOpened, action) => {
    switch (action.type) {
      case TOGGLE_SIDEBAR:
        return !state;

      default:
        return state;
    }
  },
  snackbar: (state = initialState.snackbar, action) => {
    switch (action.type) {
      case SHOW_SNACKBAR:
        return {
          ...state,
          ...action.payload,
          opened: true,
        };

      case HIDE_SNACKBAR:
        return {
          ...state,
          opened: false,
        };

      default:
        return state;
    }
  },
});
