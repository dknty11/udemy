import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
          clicked={this.sideDrawerOpenHandler}
          isAuth={this.props.isAuthenticated} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          isOpened={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler} />
        <main className="Content">
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);