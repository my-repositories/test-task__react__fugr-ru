import { call, put, takeEvery } from '@redux-saga/core/effects';
import { USERS_LOAD } from '../actionTypes';
import { usersBigSize, usersSmallSize } from '../users-mock';
import { failUsersLoading, setUsers } from '../actions';
import { config } from '../../../config';
import { showSnackbar } from '../../settings/actions';

function loadUsers(isSmallSize: boolean) {
  const isDev = process.env.NODE_ENV === 'development';
  const isHttps = window.location.protocol === 'https:';
  const timeout = 3000;

  if (isDev || isHttps) {
    return new Promise((resolve) => setTimeout(() => resolve(isSmallSize ? usersSmallSize : usersBigSize), timeout));
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(isSmallSize ? config.smallUsersUrl : config.bigUsersUrl), isSmallSize ? timeout : 0);
  })
    .then((url: any) => fetch(url))
    .then((response: Response) => response.json());
}

function* loadUsersSagaWorker(action: { type: string; payload: boolean }) {
  try {
    const items = yield call(loadUsers, action.payload);
    yield put(setUsers(items));
  } catch (e) {
    console.warn(e);
    yield put(showSnackbar({ text: 'Ошибка загрузки пользователей' }));
    yield put(failUsersLoading());
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* loadUsersSagaWatcher() {
  yield takeEvery(USERS_LOAD, loadUsersSagaWorker);
}
