import * as actionTypes from './actionTypes';

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId
});

export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

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

export const auth = (email, password, isSignUp) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignUp
});

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

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
