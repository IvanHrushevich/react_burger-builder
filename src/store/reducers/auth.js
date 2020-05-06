import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = state => updateObject(state, { error: false, loading: true });

const authSuccess = action => ({
  token: action.idToken,
  userId: action.userId,
  error: null,
  loading: false
});

const authFail = (state, action) => updateObject(state, { error: action.error, loading: false });

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    default:
      return state;
  }
};
