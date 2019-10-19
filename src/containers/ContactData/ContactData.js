import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Ivan Hrushevich',
        address: {
          street: 'Lenina 1',
          zipCode: '222222',
          country: 'Belarus'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <Input type="text" name="name" placeholder="Your Name" />
        <Input type="email" name="email" placeholder="Email" />
        <Input type="text" name="street" placeholder="Street" />
        <Input type="text" name="postal" placeholder="Postal code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h2>Enter your contact data</h2>
        {form}
      </div>
    );
  }
}

export default ContactData;
