import React from 'react';

import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Check out</NavigationItem>
  </ul>
)

export default navigationItems;