import { createSelector } from 'reselect';
import { RootState } from '../rootReducer';
import { User } from './user';

export const getIsSmallSize: (state: RootState) => boolean = (state: RootState) => state.users.isSmallSize;
export const getUsers: (state: RootState) => User[] = (state: RootState) => state.users.items;
export const hasLoadingError: (state: RootState) => boolean = (state: RootState) => state.users.hasLoadingError;
export const getUsersFilter: (state: RootState) => string = (state: RootState) => state.users.filter;

const filterFirstName = (user: User, filter: string) => user.firstName.toLowerCase().includes(filter);
const filterLastName = (user: User, filter: string) => user.lastName.toLowerCase().includes(filter);
const filterEmail = (user: User, filter: string) => user.email.toLowerCase().includes(filter);
export const getFilteredUsers = createSelector(getUsers, getUsersFilter, (users, filter) => {
  if (!filter) {
    return users;
  }

  const text = filter.toLowerCase();

  return users.filter((user) => filterFirstName(user, text) || filterLastName(user, text) || filterEmail(user, text));
});
