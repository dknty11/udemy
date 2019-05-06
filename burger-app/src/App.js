import React from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Toolbar from './components/Navigation/Toolbar/Toolbar'


function App() {
  return (
    <div>
      <Toolbar />
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
