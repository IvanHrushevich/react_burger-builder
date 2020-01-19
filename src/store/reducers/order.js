import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };

      return {
        ...state,
        loading: false,
        orders: [...state.orders, newOrder],
        purchased: true
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      };

    default:
      return state;
  }
};
