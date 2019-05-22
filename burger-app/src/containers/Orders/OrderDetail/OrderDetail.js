import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import Burger from '../../../components/Burger/Burger'
import Spinner from '../../../components/UI/Spinner/Spinner'
import ContactData from '../../Checkout/ContactData/ContactData'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../../axios-orders'

class OrderDetail extends Component {
  render() {
    let orderRedirect = null
    let orderDetail = <Spinner />;
    if (!this.props.loading) {
      if (!this.props.ings) {
        orderDetail = null;
        orderRedirect = <Redirect to="/orders" />
      } else {
        orderDetail = (
          <div>
            <Burger ingredients={this.props.ings} />
            <ContactData />
          </div>
        );
      }
    }
    return (
      <div>
        {orderRedirect}
        {orderDetail}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.order.order.ingredients,
    price: state.order.order.price,
    loading: state.order.loading
  }
}

export default connect(mapStateToProps)(withErrorHandler(OrderDetail, axios));