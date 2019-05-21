import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const INGREDIENT_PRICES = {
  salad: 1.2,
  cheese: 1.3,
  meat: 1.4,
  bacon: 1.5
}

const initialState = {
  totalPrice: 0
}

const increasePrice = (state, action) => {
  const updatedIncreaseTotalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  return updateObject(state, { totalPrice: updatedIncreaseTotalPrice })
}

const descreasePrice = (state, action) => {
  const updatedDecreaseTotalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  return updateObject(state, { totalPrice: updatedDecreaseTotalPrice })
}

const setTotalPrice = (state, action) => {
  let updated_price = 0;
  for (let key in action.ingredients) {
    if (action.ingredients[key] !== 0) {
      updated_price += INGREDIENT_PRICES[key]
    }
  }
  return updateObject(state, { totalPrice: updated_price })
}

const priceReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.INCREASE_PRICE: return increasePrice(state, action)    
    case actionTypes.DECREASE_PRICE: return descreasePrice(state, action)
    case actionTypes.SET_TOTAL_PRICE: return setTotalPrice(state, action)
    default: return state;
  }
}

export default priceReducer;