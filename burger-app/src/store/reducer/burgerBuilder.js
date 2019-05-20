import * as actionTypes from '../actions/actionTypes'

const initialState = {
  ingredients: null,
  error: false
}

const ingredientReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      }
      case actionTypes.SET_INGREDIENT:
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