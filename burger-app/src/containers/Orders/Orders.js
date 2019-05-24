import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      this.props.onFetchOrders(localToken, this.props.userId)
    } else {
      this.props.onFetchOrders(this.props.token, this.props.userId)
    }
  }

  onClickEditHandler = (order_id) => {
    // this.props.onFetchSingleOrder(order_id, this.props.token)
    this.props.history.push("/orders/detail/" + order_id)
  }

  onDeleteOrderHandler = (order_id) => {
    this.props.onDeleteOrder(order_id, this.props.token)
  }

  render() {
    let order = <p style={{textAlign: 'center'}}>You have no order available!</p>;

    if (this.props.loading) {
      order = <Spinner />
    }

    if (this.props.token && this.props.orders.length !== 0) {
      order = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
          onClickEditOrder={() => this.onClickEditHandler(order.id)}
          onClickDeleteOrder={() => this.onDeleteOrderHandler(order.id)} />
      ))
    }

    return (
      <div>
        {order}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    onDeleteOrder: (order_id, token) => dispatch(actions.deleteOrder(order_id, token)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));