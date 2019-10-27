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
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  checkValidity = (value, rules) => {
    if (!rules) {
      return;
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
      valid: this.checkValidity(
        event.target.value,
        this.state.orderForm[elementId].validation
      ),
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
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData
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
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
        >
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
