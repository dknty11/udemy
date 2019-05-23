import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const deleteOrder = (order_id, token) => {
  return dispatch => {
    dispatch(deleteOrderStart())
    axios.delete('/orders/' + order_id + '.json?auth=' + token).then(() => {
      dispatch(deleteOrderSuccess(order_id))
    }).catch(err => {
      dispatch(deleteOrderFail(err))
    })
  }
}

export const deleteOrderStart = () => {
  return {
    type: actionTypes.DELETE_ORDER_START
  }
}

export const deleteOrderSuccess = (id) => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    id
  }
}

export const deleteOrderFail = (error) => {
  return {
    type: actionTypes.DELETE_ORDER_FAIL,
    error
  }
}