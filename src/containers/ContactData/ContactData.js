import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { orderActions } from '../../store/index';

class ContactData extends Component {
  getFormElementConfig = (placeholder, elementType = 'input', type = 'text', value = '') => ({
    elementType,
    elementConfig: {
      type,
      placeholder
    },
    value,
    validation: {
      required: true
    },
    valid: false,
    touched: false
  });

  state = {
    orderForm: {
      name: this.getFormElementConfig('Your name'),
      street: this.getFormElementConfig('Your street'),
      zipCode: {
        ...this.getFormElementConfig('ZIP CODE'),
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        }
      },
      country: this.getFormElementConfig('Country'),
      email: this.getFormElementConfig('Email'),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        valid: true,
        validation: {}
      }
    },
    formIsValid: false
  };

  checkValidity = (value, rules) => {
    if (!rules) {
      return true;
    }

    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, elementId) => {
    const updatedElement = {
      ...this.state.orderForm[elementId],
      value: event.target.value,
      valid: this.checkValidity(event.target.value, this.state.orderForm[elementId].validation),
      touched: true
    };

    const updatedForm = {
      ...this.state.orderForm,
      [elementId]: updatedElement
    };

    let formIsValid = true;
    Object.keys(updatedForm).forEach(element => {
      formIsValid = updatedForm[element].valid && formIsValid;
    });

    this.setState({
      orderForm: updatedForm,
      formIsValid
    });
  };

  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });

    const orderData = Object.keys(this.state.orderForm).reduce((acc, title) => {
      acc[title] = this.state.orderForm[title].value;
      return acc;
    }, {});

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData
    };

    this.props.onOrderBurger(order);
  };

  render() {
    const formElements = Object.keys(this.state.orderForm).map(element => ({
      config: { ...this.state.orderForm[element] },
      id: element
    }));

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementtype={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            ></Input>
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.props.loading) {
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

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: orderData => dispatch(orderActions.purchaseBurger(orderData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
