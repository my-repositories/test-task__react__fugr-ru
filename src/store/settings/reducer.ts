import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { TOGGLE_SIDEBAR } from './actionTypes';

export type SettingsAction = ActionType<typeof actions>;

export type SettingsState = Readonly<{
  isSidebarOpened: boolean;
}>;
const initialState: SettingsState = {
  isSidebarOpened: true,
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
});
