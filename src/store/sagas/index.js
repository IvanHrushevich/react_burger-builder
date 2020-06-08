import { takeEvery } from 'redux-saga/effects';

import { actionTypes } from '../actions/index';
import { checkAuthTimeoutSaga, logoutSaga } from './auth';

export * from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}
