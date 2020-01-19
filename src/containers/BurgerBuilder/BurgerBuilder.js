import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/Aux1/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { burgerBuilderActions, orderActions } from '../../store/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  updatePurchaseState() {
    const sum = Object.values(this.props.ings).reduce((acc, curr) => acc + curr, 0);

    return sum > 0;
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;
    let orderSummary = <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState()}
            price={this.props.price}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purcaseCanceled={this.purchaseCancelHandler}
          purcaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal isVisible={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: name => dispatch(burgerBuilderActions.addIngredient(name)),
  onIngredientRemoved: name => dispatch(burgerBuilderActions.removeIngredient(name)),
  onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  onInitPurchase: () => dispatch(orderActions.purchaseInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
