import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId
});

export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

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
    })
    .catch(error => {
      dispatch(authFail(error.response.data.error));
    });
};
