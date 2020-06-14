import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { orderActions } from '../../store/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = ({ onFetchOrders, token, userId, loading, orders }) => {
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let orderList = <Spinner />;

  if (!loading) {
    orderList = orders.map(order => (
      <Order key={order.id} ingredients={order.ingredients} price={Number(order.price)} />
    ));
  }
  return <div>{orderList}</div>;
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
