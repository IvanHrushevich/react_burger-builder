import React, { Component } from 'react';

import { createFormElementConfig } from '../../utils/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { updateObject } from '../../store/index';

export default class Auth extends Component {
  state = {
    controls: {
      name: updateObject(createFormElementConfig('Email', 'input', 'email'), {
        validation: {
          required: true,
          isEmail: true
        }
      }),
      password: updateObject(createFormElementConfig('Password', 'input', 'password'), {
        validation: {
          required: true,
          minLength: 6
        }
      })
    }
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

    if (rules.isEmail) {
      const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      isValid = emailRegExp.test(value) && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControl = updateObject(this.state.controls[controlName], {
      value: event.target.value,
      valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
      touched: true
    });

    const updatedControls = updateObject(this.state.controls, { [controlName]: updatedControl });

    this.setState({ controls: updatedControls });
  };

  render() {
    const formElements = Object.keys(this.state.controls).map(element => ({
      config: { ...this.state.controls[element] },
      id: element
    }));

    const form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementtype={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}
