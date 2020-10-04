import { put, takeEvery } from '@redux-saga/core/effects';
import { showSnackbar } from '../../settings/actions';
import { User } from '../user';
import { USERS_ADD_USER } from '../actionTypes';

function* addUsersSagaWorker(action: { type: string; payload: User }) {
  yield put(showSnackbar({ text: `Пользователь#${action.payload.id} успешно добавлен` }));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* addUserSagaWatcher() {
  yield takeEvery(USERS_ADD_USER, addUsersSagaWorker);
}
