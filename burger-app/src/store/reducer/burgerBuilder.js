import * as actionTypes from '../actions/actionTypes'

const INGREDIENT_PRICES = {
  salad: 1.2,
  cheese: 1.3,
  meat: 1.4,
  bacon: 1.5
}

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false
}

const ingredientReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT:
      console.log('[ingredients.js]')
      console.log(state)
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
      case actionTypes.SET_INGREDIENT:
        console.log(action.ingredients)
        return {
          ...state,
          ingredients: action.ingredients
        }
      case actionTypes.FETCH_INGREDIENTS_ERROR:
        console.log('Failed fetching')
        return {
          ...state,
          error: true
        }
    default: break;
  }
  return state;
}

export default ingredientReducer;