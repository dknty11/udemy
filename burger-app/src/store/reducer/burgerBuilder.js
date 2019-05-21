import * as actionTypes from '../actions/actionTypes'
import { statement } from '@babel/template';
import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  error: false
}

const addIngredient = (state, action) => {
  const updatedAddedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  }
  const updatedAddedIngredients = updateObject(state.ingredients, updatedAddedIngredient)
  const updatedAddedState = { ingredients: updatedAddedIngredients }
  return updateObject(state, updatedAddedState)
}

const removeIngredient = (state, action) => {
  const updatedRemovedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  }
  const updatedRemovedIngredients = updateObject(state.ingredients, updatedRemovedIngredient)
  const updatedRemovedState = { ingredients: updatedRemovedIngredients }
  return updateObject(state, updatedRemovedState)
}

const setIngredient = (state, action) => {
  return updateObject(state, { ingredients: action.ingredients })
}

const fetchIngredientError = (state, action) => {
  return updateObject(state, { error: true })
}

const ingredientReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENT: return setIngredient(state, action)
    case actionTypes.FETCH_INGREDIENTS_ERROR: return fetchIngredientError(state, action)
    default: return state;
  }
}

export default ingredientReducer;