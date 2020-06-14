import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

import { orderActions } from '../actions/index';

export function* purchaseBurgerSaga(action) {
  yield put(orderActions.purchaseBurgerStart());

  try {
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(orderActions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(orderActions.purchaseBurgerSuccess(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(orderActions.fetchOrdersStart());
  try {
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;

    const response = yield axios.get('/orders.json' + queryParams);

    const orders = Object.keys(response.data).reduce((acc, curr) => {
      const order = {
        ...response.data[curr],
        id: curr
      };
      acc.push(order);
      return acc;
    }, []);

    yield put(orderActions.fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(orderActions.fetchOrdersFail(error));
  }
}
