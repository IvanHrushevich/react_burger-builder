import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current price: {props.price.toFixed(2)}</p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.type}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
      />
    ))}
    <button disabled={!props.purchasable} className={classes.OrderButton}>
      ORDER
    </button>
  </div>
);

export default buildControls;
