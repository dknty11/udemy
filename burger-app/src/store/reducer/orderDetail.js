import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
  order: {
    ingredients: null,
    orderData: null,
    price: null
  },
  loading: false
}

const fetchSingleOrderStart = state => {
  return updateObject(state, { loading: true })
}

const fetchSingleOrderSuccess = (state, action) => {
  return updateObject(state, { order: action.order, loading: false })
}

const fetchSingleOrderFail = state => {
  return updateObject(state, { loading: false })
}

const orderDetailReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_SINGLE_ORDER_START: return fetchSingleOrderStart(state)
    case actionTypes.FETCH_SINGLE_ORDER_SUCCESS: return fetchSingleOrderSuccess(state, action)
    case actionTypes.FETCH_SINGLE_ORDER_FAIL: return fetchSingleOrderFail(state)
    default: return state;
  }
}

export default orderDetailReducer;
