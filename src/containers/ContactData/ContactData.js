import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
  getFormElementConfig = (
    placeholder,
    elementType = 'input',
    type = 'text',
    value = ''
  ) => ({
    elementType,
    elementConfig: {
      type,
      placeholder
    },
    value
  });

  state = {
    orderForm: {
      name: this.getFormElementConfig('Your name'),
      street: this.getFormElementConfig('Your street'),
      zipCode: this.getFormElementConfig('ZIP CODE'),
      country: this.getFormElementConfig('Country'),
      email: this.getFormElementConfig('Email'),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        }
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
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
    const formElements = Object.keys(this.state.orderForm).map(element => ({
      config: { ...this.state.orderForm[element] },
      id: element
    }));

    let form = (
      <form>
        {formElements.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementtype={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
            ></Input>
          );
        })}
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
