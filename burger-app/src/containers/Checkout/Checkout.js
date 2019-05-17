import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  componentWillMount() {
    // const queryString = new URLSearchParams(this.props.location.search)
    // const ingredients = {};
    // let price = 0;
    // for (let param of queryString.entries()) {
    //   // ['salad', '1']
    //   if (param[0] === 'price') {
    //     price = param[1]
    //   } else {
    //     ingredients[param[0]] = +param[1];
    //   }
    // }
    // this.setState({ ingredients: ingredients, totalPrice: price })
  }

  // How to pass ingredients from burger builder to checkout
  submitCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          onClickContinue={this.submitCheckoutHandler}
          onClickCancel={this.cancelCheckoutHandler} />
        <Route path={this.props.match.path + '/contact-data'}
          render={(props) => (<ContactData
                            ingredients={this.props.ings}
                            price={this.props.price}
                            {...props}
                        />)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.globalIngredients.ingredients,
    price: state.globalIngredients.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout);