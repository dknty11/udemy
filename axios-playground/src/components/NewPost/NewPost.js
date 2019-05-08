import React, { Component } from 'react';

import './NewPost.css';
import axios from 'axios';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Vern1'
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(res => {
                console.log(res)
            })
    }

    onTitleChangeHandler = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    onContentChangeHandler = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    onAuthorChangeHandler = (e) => {
        this.setState({
            author: e.target.value
        })
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={this.onTitleChangeHandler} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={this.onContentChangeHandler} />
                <label>Author</label>
                <select value={this.state.author} onChange={this.onAuthorChangeHandler}>
                    <option value="Vern">Vern</option>
                    <option value="Vernon">Vernon</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;