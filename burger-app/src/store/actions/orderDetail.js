import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const fetchSingleOrder = (order_id) => {
  return dispatch => {
    dispatch(fetchSingleOrderStart())
    axios.get('/orders/' + order_id + '.json').then(res => {
      dispatch(fetchSingleOrderSuccess(res.data))
    }).catch(err => {
      dispatch(fetchSingleOrderFail(err))
    })
  }
}

export const fetchSingleOrderStart = () => {
  return {
    type: actionTypes.FETCH_SINGLE_ORDER_START
  }
}

export const fetchSingleOrderSuccess = (order) => {
  return {
    type: actionTypes.FETCH_SINGLE_ORDER_SUCCESS,
    order
  }
}

export const fetchSingleOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_SINGLE_ORDER_FAIL,
    error
  }
}