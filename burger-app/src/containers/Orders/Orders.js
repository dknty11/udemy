import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token)
  }

  onFetchOrderHandler = (order_id) => {
    this.props.onFetchSingleOrder(order_id, this.props.token)
    this.props.history.push("/orders/detail/" + order_id)
  }

  onDeleteOrderHandler = (order_id) => {
    this.props.onDeleteOrder(order_id, this.props.token)
  }

  render() {
    let order = (
      this.props.orders.map((order) => (
        <div>
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
            onClickEditOrder={() => this.onFetchOrderHandler(order.id)}
            onClickDeleteOrder={() => this.onDeleteOrderHandler(order.id)} />
        </div>
      ))
    )
    if (this.props.orders.length === 0) {
      order = <p style={{textAlign: 'center'}}>You have no order available!</p>
    }
    if (this.props.loading) {
      order = <Spinner />
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
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    onFetchSingleOrder: (order_id, token) => dispatch(actions.fetchSingleOrder(order_id, token)),
    onDeleteOrder: (order_id, token) => dispatch(actions.deleteOrder(order_id, token)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));