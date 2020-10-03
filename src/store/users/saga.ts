import { call, put, takeEvery } from '@redux-saga/core/effects';
import { USERS_LOAD } from './actionTypes';
import { usersBigSize, usersSmallSize } from './users-mock';
import { failUsersLoading, setUsers } from './actions';
import { config } from '../../config';

function loadUsers(isSmallSize: boolean) {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve(isSmallSize ? usersSmallSize : usersBigSize);
  }

  const url = isSmallSize ? config.smallUsersUrl : config.bigUsersUrl;
  return fetch(url).then((response) => response.json());
}

function* loadUsersSagaWorker(action: { type: string; payload: boolean }) {
  try {
    const items = yield call(loadUsers, action.payload);
    yield put(setUsers(items));
  } catch (e) {
    console.warn(e);
    yield put(failUsersLoading());
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* loadUsersSagaWatcher() {
  yield takeEvery(USERS_LOAD, loadUsersSagaWorker);
}
