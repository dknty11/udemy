import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import * as actions from '../../store/actions/index'

class Checkout extends Component {
  componentWillUpdate() {
    this.props.onInitPurchase();
  }

  // How to pass ingredients from burger builder to checkout
  submitCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack()
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onClickContinue={this.submitCheckoutHandler}
            onClickCancel={this.cancelCheckoutHandler} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
      </div>);
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.globalIngredients.ingredients,
    price: state.globalIngredients.totalPrice,
    purchased: state.orders.purchased
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);