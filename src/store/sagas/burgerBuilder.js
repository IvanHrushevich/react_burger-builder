import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

import { burgerBuilderActions } from '../actions/index';

export function* initIngredientsSaga() {
  try {
    const response = yield axios.get(
      'https://react-burger-builder-c129b.firebaseio.com/ingredients.json'
    );
    yield put(burgerBuilderActions.setIngredients(response.data));
  } catch (error) {
    yield put(burgerBuilderActions.fetchIngredientsFailed());
  }
}
