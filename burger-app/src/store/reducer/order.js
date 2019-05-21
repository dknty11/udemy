import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false })
}

const purchaseStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const purchaseSuccess = (state, action) => {
  const updatedNewOrder = updateObject(action.orderData, { id: action.orderId })
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(updatedNewOrder),
    purchased: true
  })
}

const purchaseFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false})
}

const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: true })
}

const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
    case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state, action)
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action)
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state, action)
    case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state, action)
    case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action)
    case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(state, action)
    default: return state
  }
}

export default ordersReducer;