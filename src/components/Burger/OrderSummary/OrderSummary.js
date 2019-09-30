import React from 'react';

import Aux from '../../../hoc/Aux1';
import Button from '../../UI/Button/Button';

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
      <Button btnType="Danger" clicked={props.purcaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purcaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
