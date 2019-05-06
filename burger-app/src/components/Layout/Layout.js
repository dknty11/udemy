import React from 'react'
import Aux from '../../hoc/Aux'
import './Layout.css';

const layout = (props) => (
  <Aux>
    <div>
      Toolbar, sideDrawer, Backdrop
    </div>
    <main className="Content">
      {props.children}
    </main>
  </Aux>
);

export default layout;