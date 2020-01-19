import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = state => updateObject(state, { purchased: false });
const addLoader = state => updateObject(state, { loading: true });
const removeLoader = state => updateObject(state, { loading: false });
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  return updateObject(state, {
    loading: false,
    orders: [...state.orders, newOrder],
    purchased: true
  });
};
const fetchOrdersSuccess = (state, action) =>
  updateObject(state, { loading: false, orders: action.orders });

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);

    case actionTypes.PURCHASE_BURGER_START:
    case actionTypes.FETCH_ORDERS_START:
      return addLoader(state);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
    case actionTypes.FETCH_ORDERS_FAIL:
      return removeLoader(state);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    default:
      return state;
  }
};
