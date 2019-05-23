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
    idToken: authData.idToken,
    userId: authData.localId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const userData = {
      email,
      password,
      returnSecureToken: true
    }
    console.log('[Auth.js] ' + isSignup)
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBqcTjZOYzsu0hIza3RgkLz_w2ZYE7enlk'
    if (isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBqcTjZOYzsu0hIza3RgkLz_w2ZYE7enlk'
    }
    axios.post(url, userData)
      .then(res => {
        dispatch(authSuccess(res.data))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  }
}