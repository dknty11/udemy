import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders()
  }

  onFetchOrderHandler = (order_id) => {
    this.props.onFetchSingleOrder(order_id)
    this.props.history.push("/orders/detail/" + order_id)
  }

  onDeleteOrderHandler = (order_id) => {
    this.props.onDeleteOrder(order_id)
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
    loading: state.orders.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
    onFetchSingleOrder: (order_id) => dispatch(actions.fetchSingleOrder(order_id)),
    onDeleteOrder: (order_id) => dispatch(actions.deleteOrder(order_id)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));