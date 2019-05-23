import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const userData = {
      email,
      password,
      returnSecureToken: true
    }
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBqcTjZOYzsu0hIza3RgkLz_w2ZYE7enlk', userData)
      .then(res => {
        dispatch(authSuccess(res.data))
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
}