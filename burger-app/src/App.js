import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import OrderDetail from './containers/Orders/OrderDetail/OrderDetail'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

class App extends Component {
  render () {
    return (
      <div>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" exact component={Orders} />
              <Route path="/orders/detail/:id" component={OrderDetail} />
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
            </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
