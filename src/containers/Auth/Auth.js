import React, { Component } from 'react';

import { createFormElementConfig } from '../../utils/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

export default class Auth extends Component {
  state = {
    controls: {
      name: {
        ...createFormElementConfig('Email', 'input', 'email'),
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        ...createFormElementConfig('Password', 'input', 'password'),
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
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
