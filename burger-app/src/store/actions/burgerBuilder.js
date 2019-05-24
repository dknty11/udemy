import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios-orders'

// ADD ingredient and increase total price
export const addIncrement = (ingredientName) => {
  return dispatch => {
    dispatch(addIngredient(ingredientName))
    dispatch(actions.increaseTotalPrice(ingredientName))
  }
}

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
  }
}

// Remove ingredient and decrease total price
export const removeIncrement = (ingredientName) => {
  return dispatch => {
    dispatch(removeIngredient(ingredientName))
    dispatch(actions.decreaseTotalPrice(ingredientName))
  }
}

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients
  }
}

export const fetchIngredientsError = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_ERROR
  }
}

export const fetchIngredient = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data))
        dispatch(actions.setTotalPrice(res.data))
      })
      .catch(err => {
        dispatch(fetchIngredientsError())
    })
  }
}