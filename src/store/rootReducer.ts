import { combineReducers } from 'redux';
import settingsReducer, { SettingsState } from './settings/reducer';
import usersReducer, { UsersState } from './users/reducer';

export type RootState = Readonly<{
  settings: SettingsState;
  users: UsersState;
}>;

export const rootReducer = combineReducers({ settings: settingsReducer, users: usersReducer });
