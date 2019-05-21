import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData).then((res) => {
      console.log(res.data)
      dispatch(purchaseBurgerSuccess(res.data.name, orderData))
    }).catch((err) => {
      console.log('[Burger Builder] Error:\n')
      console.log(err)
      dispatch(purchaseBurgerFail(err))
    })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const fetchOrders = (orders) => {
  return dispatch => {
    dispatch(fetchOrderStart())
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(fetchOrderSuccess(fetchedOrders))
      })
      .catch(err => {
        dispatch(fetchOrderFail(err))
      })
  }
}

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  }
}

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders
  }
}

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error
  }
}