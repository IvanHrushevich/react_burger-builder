import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(res => {
        const orders = Object.keys(res.data).reduce((acc, curr) => {
          const order = {
            ...res.data[curr],
            id: curr
          };
          acc.push(order);
          return acc;
        }, []);

        this.setState({ loading: false, orders });
      })
      .catch(er => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={Number(order.price)}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
