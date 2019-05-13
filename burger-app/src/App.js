import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Layout from './hoc/Aux/Aux'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import Checkout from './containers/Checkout/Checkout'


class App extends Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <Toolbar />
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
