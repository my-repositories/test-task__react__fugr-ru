import { action } from 'typesafe-actions';
import {
  TOGGLE_USERS_SIZE,
  USERS_ADD_USER,
  USERS_LOAD,
  USERS_LOADED_ERROR,
  USERS_LOADED_SUCCESS,
  USERS_SELECT_USER,
  USERS_SET_FILTER,
} from './actionTypes';
import { User } from './user';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const toggleUsersSize = () => action(TOGGLE_USERS_SIZE);

export const loadUsers = (isSmallSize: boolean) => action(USERS_LOAD, isSmallSize);

export const setUsers = (items: User[]) => action(USERS_LOADED_SUCCESS, items);

export const failUsersLoading = () => action(USERS_LOADED_ERROR);

export const setFilter = (text: string) => action(USERS_SET_FILTER, text);

export const selectUser = (user: User | null) => action(USERS_SELECT_USER, user);

export const addUser = (user: User) => action(USERS_ADD_USER, user);
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
