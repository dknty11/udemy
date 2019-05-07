import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  
  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerOpenHandler = () => {
    this.setState({
      showSideDrawer: true
    })
  }
  
  render () {
    return (
      <Aux>
        <Toolbar 
          clicked={this.sideDrawerOpenHandler} />
        <SideDrawer
          isOpened={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler} />
        <main className="Content">
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;