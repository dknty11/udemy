import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions'

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  }
}

const ingredientReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_INGREDIENT:
      console.log('[ingredients.js]')
      console.log(state)
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      }
    default: break;
  }
  return state;
}

export default ingredientReducer;







// updatePurchaseState(ingredients) {
//   const sum = Object.keys(ingredients)
//     .map((igKey) => {
//       return ingredients[igKey]
//     })
//     .reduce((sum, el) => {
//       return sum + el;
//     }, 0)
//   this.setState({
//     purchasable: sum > 0
//   })
  
// }