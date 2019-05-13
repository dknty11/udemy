import React, {Component} from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post'
import './Posts.css'

class Posts extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    console.log('Posts.js')
    console.log(this.props)
    axios.get('/posts')
      .then((res) => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
              ...post,
              author: 'Vern'
          }
        })
        this.setState({ posts: updatedPosts })
      })
      .catch((error) => {
        console.log(error)
        // this.setState({ error: true })
      });
  }
  getPostDetailHandler = (id) => {
    this.setState({ selectedPostId: id })
  }
  render () {
    let posts = <p>Something went wrong!</p>
    if (!this.state.error) {
        posts = this.state.posts.map((post) => {
            return (<Link to={'/' + post.id} key={post.id}>
              <Post
                title={post.title}
                author={post.author}
                clicked={() => this.getPostDetailHandler(post.id)} />
            </Link> );
        })
    }
    return (
      <section className="Posts">
        {posts}
      </section>
    )
  }
}

export default Posts;