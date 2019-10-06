import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 1,
  cheese: 0.5,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Ivan Hrushevich',
        address: {
          street: 'Lenina 1',
          zipCode: '222222',
          country: 'Belarus'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(() => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce((acc, curr) => acc + curr, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const updatedAmount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedAmount
    };
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const updatedAmount = this.state.ingredients[type] - 1;

    if (updatedAmount < 0) {
      return;
    }

    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedAmount
    };
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });

    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purcaseCanceled={this.purchaseCancelHandler}
        purcaseContinued={this.purchaseContinueHandler}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          isVisible={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
