import React from 'react';

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>)
    })
  return (
    <Aux>
      <h3>Your order</h3>
      <ul>
        {ingredientSummary}
      </ul>
      <label>Your price: </label>
      <span><strong>{props.price}</strong>$</span>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
    </Aux>
  )
};

export default orderSummary;