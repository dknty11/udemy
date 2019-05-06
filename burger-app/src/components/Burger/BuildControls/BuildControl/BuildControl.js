import React from 'react';
import './BuildControl'

const buildControl = (props) => (
  <div>
    <div className="BuildControl">{props.label}</div>
    <button onClick={props.added}>More</button>
    <button
      onClick={props.subtracted}
      disabled={props.disabled}>Less</button>
  </div>
)

export default buildControl;