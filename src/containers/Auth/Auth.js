import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createFormElementConfig } from '../../utils/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { updateObject, authActions } from '../../store/index';

class Auth extends Component {
  state = {
    controls: {
      email: updateObject(createFormElementConfig('Email', 'input', 'email'), {
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
    },
    isSignUp: true
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

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = event => {
    event.preventDefault();
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
  };

  render() {
    const formElements = Object.keys(this.state.controls).map(element => ({
      config: { ...this.state.controls[element] },
      id: element
    }));

    let form = formElements.map(formElement => (
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

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
          <Button clicked={this.switchAuthModeHandler} btnType="Danger">
            Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
