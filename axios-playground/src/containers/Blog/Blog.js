import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost'
import './Blog.css';
// import asyncComponent from '../../hoc/asyncComponent'

// const AsyncNewPost = asyncComponent(() => {
//   return import('./NewPost/NewPost');
// });

const NewPost = React.lazy(() => import('./NewPost/NewPost'))

class Blog extends Component {
  state = {
    auth: false
  }
  render () {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
                <li><NavLink to="/posts" exact>POSTS</NavLink></li>
                <li><NavLink to={{
                  pathname: '/new-post',
                  hash: '#submit',
                  search: '?submit=true'
                }} >NEW POST</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? <Route path="/new-post" render={() => 
          <Suspense fallback={<div>Loading...</div>}>
            <NewPost />
          </Suspense>} />  : null }
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default Blog;