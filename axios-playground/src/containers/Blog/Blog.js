import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost'
import './Blog.css';
import FullPost from './FullPost/FullPost'

class Blog extends Component {
  render () {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
                <li><NavLink to="/" exact>HOME</NavLink></li>
                <li><NavLink to={{
                  pathname: '/new-post',
                  hash: '#submit',
                  search: '?submit=true'
                }} >NEW POST</NavLink></li>
            </ul>
          </nav>
        </header>
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" component={NewPost} />
        <Route path="/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Blog;