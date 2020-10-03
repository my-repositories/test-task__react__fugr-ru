import { call, put, takeEvery } from '@redux-saga/core/effects';
import { USERS_LOAD } from './actionTypes';
import { usersBigSize, usersSmallSize } from './user';
import { failUsersLoading, setUsers } from './actions';

function loadUsers(isSmallSize: boolean) {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve(isSmallSize ? usersSmallSize : usersBigSize);
  }

  const smallUrl =
    'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
  const bigUrl =
    'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

  const url = isSmallSize ? smallUrl : bigUrl;
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
