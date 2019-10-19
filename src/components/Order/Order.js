import React from 'react';
import classes from './Order.module.css';

const order = props => {
  const ingredients = Object.keys(props.ingredients)
    .map(ingredient => ({
      name: ingredient,
      amount: props.ingredients[ingredient]
    }))
    .map(ing => (
      <span key={ing.name} className={classes.IngredientBox}>
        {ing.name} ({ing.amount})
      </span>
    ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
