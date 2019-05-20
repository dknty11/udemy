import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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
  return {
    type: actionTypes.FETCH_ALL_ORDERS,
    orders
  }
}

export const fetchAllOrders = () => {
  return dispatch => {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(fetchOrders(fetchedOrders))
      })
      .catch(err => {
        console.log('[Orders.js] [Action]')
        console.log(err)
      })
  }
}

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