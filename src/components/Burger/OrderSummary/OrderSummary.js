import React from 'react';

import Aux from '../../UI/Modal/Modal';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}:</span>
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <Aux>
      <h2>Your order</h2>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;
