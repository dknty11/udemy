import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderAction from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  }

  componentDidMount () {
    this.props.onInitIngredients()
  }

  // addIngredientHandler = (type) => {
    // const oldCount = this.state.ingredients[type];
    // const updatedCount = oldCount + 1;
    // const updatedIngredients = {
    //   ...this.state.ingredients
    // }
    // updatedIngredients[type] = updatedCount;
    // const priceAddition = INGREDIENT_PRICES[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice + priceAddition;
    // this.setState({
    //   totalPrice: newPrice,
    //   ingredients: updatedIngredients
    // })
    // this.updatePurchaseState(updatedIngredients)
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceSubtraction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceSubtraction;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }

  updatePurchaseState() {
    const sum = Object.keys(this.props.ings)
      .map((igKey) => {
        return this.props.ings[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)
    return sum > 0; 
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : null;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientSubtracted={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            order={this.purchaseHandler}
            purchasable={this.updatePurchaseState()}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
            ingredients={this.props.ings}
            purchaseContinue={this.purchaseContinueHandler}
            purchaseCancel={this.purchaseCancelHandler}
            price={this.props.price}
        />
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.globalIngredients.ingredients,
    price: state.price.totalPrice,
    error: state.globalIngredients.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(burgerBuilderAction.addIncrement(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderAction.removeIncrement(ingredientName)),
    onInitIngredients: () => dispatch(burgerBuilderAction.fetchIngredient())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));