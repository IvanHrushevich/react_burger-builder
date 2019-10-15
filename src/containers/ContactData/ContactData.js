import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h2>Enter your contact data</h2>
        <input type="text" name="name" placeholder="Your Name"></input>
        <input type="email" name="email" placeholder="Email"></input>
        <input type="text" name="street" placeholder="Street"></input>
        <input type="text" name="postal" placeholder="Postal code"></input>
        <Button btnType="Success">Order</Button>
      </div>
    );
  }
}

export default ContactData;
