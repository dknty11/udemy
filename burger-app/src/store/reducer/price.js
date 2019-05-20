import * as actionTypes from '../actions/actionTypes'

const INGREDIENT_PRICES = {
  salad: 1.2,
  cheese: 1.3,
  meat: 1.4,
  bacon: 1.5
}

const initialState = {
  totalPrice: 0
}

const priceReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.INCREASE_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.DECREASE_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.SET_TOTAL_PRICE:
      let updated_price = 0;
      for (let key in action.ingredients) {
        if (action.ingredients[key] !== 0) {
          updated_price += INGREDIENT_PRICES[key]
        }
      }
      return {
        ...state,
        totalPrice: updated_price
      }
    default: break;
  }
  return state;
}

export default priceReducer;