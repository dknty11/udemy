import React from 'react';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css';
import Aux from '../../../hoc/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
  let attachedClasses = ['SideDrawer', 'Close'];
  if (props.isOpened) {
    attachedClasses = ['SideDrawer', 'Open']
  }
  return (
    <Aux>
      <Backdrop
        show={props.isOpened}
        clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className="Logo2">
          <Logo />
        </div>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer;