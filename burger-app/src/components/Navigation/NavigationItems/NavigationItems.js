import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem>
      <NavLink to="/" exact>Burger Builder</NavLink>
    </NavigationItem>
    <NavigationItem>
      <NavLink to="/checkout">Check Out</NavLink>
    </NavigationItem>
  </ul>
)

export default navigationItems;