import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => ({ type: actionTypes.AUTH_START });

const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId
});

const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
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
