import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => ({ type: actionTypes.AUTH_START });

const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId
});

const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () => {
  return { type: actionTypes.AUTH_INITIATE_LOGOUT };
};

export const logoutSucceed = () => {
  return { type: actionTypes.AUTH_LOGOUT };
};

const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  };
};

export const auth = (email, password, isSignUp) => dispatch => {
  dispatch(authStart());

  const url = isSignUp
    ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCy3di_33lsTRmAfiJbflTzYNhg5MQSW2Y'
    : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCy3di_33lsTRmAfiJbflTzYNhg5MQSW2Y';

  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  axios({
    method: 'post',
    url,
    data: authData
  })
    .then(response => {
      setTokenToLocalStorage(
        response.data.idToken,
        Number(response.data.expiresIn) * 1000,
        response.data.localId
      );
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
    })
    .catch(error => {
      dispatch(authFail(error.response.data.error));
    });
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

const setTokenToLocalStorage = (token, expirationTime, userId) => {
  const expirationDate = new Date(Date.now() + expirationTime);

  localStorage.setItem('token', token);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('userId', userId);
};

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate < new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(checkAuthTimeout(expirationTime));
    }
  }
};
