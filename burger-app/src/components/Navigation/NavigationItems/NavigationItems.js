import React from 'react';

import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem linkTo="/" exact>Burger Builder</NavigationItem>
    <NavigationItem linkTo="/orders">Orders</NavigationItem>
    <NavigationItem linkTo="/auth">Authenticate</NavigationItem>
  </ul>
)

export default navigationItems;