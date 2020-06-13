import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import { authActions } from '../actions/index';

export function* logoutSaga() {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(authActions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(authActions.logout());
}

export function* authUserSaga(action) {
  yield put(authActions.authStart());

  const url = action.isSignUp
    ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCy3di_33lsTRmAfiJbflTzYNhg5MQSW2Y'
    : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCy3di_33lsTRmAfiJbflTzYNhg5MQSW2Y';

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  try {
    const response = yield axios({
      method: 'post',
      url,
      data: authData
    });

    setTokenToLocalStorage(
      response.data.idToken,
      Number(response.data.expiresIn) * 1000,
      response.data.localId
    );

    yield put(authActions.authSuccess(response.data.idToken, response.data.localId));
    yield put(authActions.checkAuthTimeout(response.data.expiresIn * 1000));
  } catch (error) {
    yield put(authActions.authFail(error.response.data.error));
  }
}

const setTokenToLocalStorage = (token, expirationTime, userId) => {
  const expirationDate = new Date(Date.now() + expirationTime);

  localStorage.setItem('token', token);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('userId', userId);
};
