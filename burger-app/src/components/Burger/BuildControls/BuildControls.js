import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => (
  <div className="BuildControls">
    <div>
      <label>Total Price: <strong>{props.price.toFixed(2)}</strong></label>
    </div>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        subtracted={() => props.ingredientSubtracted(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className="OrderButton"
      disabled={!props.purchasable}
      onClick={props.order}>Order now</button>
  </div>
);

export default buildControls;