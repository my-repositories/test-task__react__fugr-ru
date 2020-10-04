import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import {
  TOGGLE_USERS_SIZE,
  USERS_LOADED_ERROR,
  USERS_LOADED_SUCCESS,
  USERS_SELECT_USER,
  USERS_SET_FILTER,
} from './actionTypes';
import { User } from './user';

export type UsersAction = ActionType<typeof actions>;

export type UsersState = Readonly<{
  isSmallSize: boolean;
  items: User[];
  hasLoadingError: boolean;
  filter: string;
  selectedUser: User | null;
}>;
const initialState: UsersState = {
  isSmallSize: true,
  items: [],
  hasLoadingError: false,
  filter: '',
  selectedUser: null,
};

export default combineReducers<UsersState, UsersAction>({
  isSmallSize: (state = initialState.isSmallSize, action) => {
    switch (action.type) {
      case TOGGLE_USERS_SIZE:
        return !state;

      default:
        return state;
    }
  },
  items: (state = initialState.items, action) => {
    switch (action.type) {
      case USERS_LOADED_SUCCESS:
        return action.payload;

      default:
        return state;
    }
  },
  hasLoadingError: (state = initialState.hasLoadingError, action) => {
    switch (action.type) {
      case USERS_LOADED_ERROR:
        return true;

      case USERS_LOADED_SUCCESS:
        return true;

      default:
        return state;
    }
  },
  filter: (state = initialState.filter, action) => {
    switch (action.type) {
      case USERS_SET_FILTER:
        return action.payload;

      default:
        return state;
    }
  },
  selectedUser: (state = initialState.selectedUser, action) => {
    switch (action.type) {
      case USERS_SELECT_USER:
        return action.payload;

      default:
        return state;
    }
  },
});
