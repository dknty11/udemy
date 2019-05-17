import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIncrement = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
  }
}

export const removeIncrement = (ingredientName) => {
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
  console.log('fetching')
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchIngredientsError())
    })
  }
}