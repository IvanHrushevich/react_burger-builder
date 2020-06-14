import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createFormElementConfig, checkValidity } from '../../utils/index';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { orderActions, updateObject } from '../../store/index';

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: createFormElementConfig('Your name'),
    street: createFormElementConfig('Your street'),
    zipCode: {
      ...createFormElementConfig('ZIP CODE'),
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      }
    },
    country: createFormElementConfig('Country'),
    email: updateObject(createFormElementConfig('Email'), {
      validation: {
        required: true,
        isEmail: true
      }
    }),
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
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, elementId) => {
    const updatedElement = {
      ...orderForm[elementId],
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[elementId].validation),
      touched: true
    };

    const updatedForm = {
      ...orderForm,
      [elementId]: updatedElement
    };

    let formIsValid = true;
    Object.keys(updatedForm).forEach(element => {
      formIsValid = updatedForm[element].valid && formIsValid;
    });

    setOrderForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  const orderHandler = event => {
    event.preventDefault();

    const orderData = Object.keys(orderForm).reduce((acc, title) => {
      acc[title] = orderForm[title].value;
      return acc;
    }, {});

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  };

  const formElements = Object.keys(orderForm).map(element => ({
    config: { ...orderForm[element] },
    id: element
  }));

  let form = (
    <form onSubmit={orderHandler}>
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
            changed={event => inputChangedHandler(event, formElement.id)}
          />
        );
      })}
      <Button btnType="Success" disabled={!formIsValid} clicked={orderHandler}>
        Order
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h2>Enter your contact data</h2>
      {form}
    </div>
  );
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
