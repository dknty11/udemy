import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../../components/Burger/Burger'
import Spinner from '../../../components/UI/Spinner/Spinner'
import ContactData from '../../Checkout/ContactData/ContactData'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../../axios-orders'
import * as actions from '../../../store/actions/index'

class OrderDetail extends Component {
  componentDidMount() {
    this.props.onFetchSingleOrder(this.props.match.params.id, this.props.token)
  }
  render() {
    let orderDetail = <Spinner />;
    if (!this.props.loading) {
      orderDetail = (
          <Burger ingredients={this.props.ings} />
        );
    }
    return (
      <div>
        {orderDetail}
        <ContactData />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.order.order.ingredients,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleOrder: (order_id, token) => dispatch(actions.fetchSingleOrder(order_id, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderDetail, axios));