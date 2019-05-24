import React from 'react';

import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem linkTo="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated
      ? <NavigationItem linkTo="/orders">Orders</NavigationItem>
      : null }
    {props.isAuthenticated
      ? <NavigationItem linkTo="/logout">Logout</NavigationItem>
      : <NavigationItem linkTo="/auth">Authenticate</NavigationItem> }
  </ul>
)

export default navigationItems;