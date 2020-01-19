import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName
});

export const removeIngredient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const fetchIngredientsFailed = ingredients => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => dispatch => {
  axios
    .get('https://react-burger-builder-c129b.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data));
    })
    .catch(() => dispatch(fetchIngredientsFailed()));
};
