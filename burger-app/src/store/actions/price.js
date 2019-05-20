import * as actionTypes from './actionTypes'

export const increaseTotalPrice = (ingredientName) => {
  return {
    type: actionTypes.INCREASE_PRICE,
    ingredientName
  }
}

export const decreaseTotalPrice = (ingredientName) => {
  return {
    type: actionTypes.DECREASE_PRICE,
    ingredientName
  }
}

export const setTotalPrice = (ingredients) => {
  return {
    type: actionTypes.SET_TOTAL_PRICE,
    ingredients
  }
}