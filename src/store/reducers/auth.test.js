import { authReducer } from './auth';
import { actionTypes } from '../actions/index';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should store token upon login', () => {
    const loginAction = {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'fakeToken',
      userId: 'fakeId'
    };
    const expectedState = {
      ...initialState,
      token: 'fakeToken',
      userId: 'fakeId'
    };

    expect(authReducer(initialState, loginAction)).toEqual(expectedState);
  });
});
