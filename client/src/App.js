import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import PostsPage from './components/PostsPage'
import Profile from './components/Profile'
import Footer from './components/Footer'
import axios from 'axios'


class App extends Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            formToggle: false
        }
    }

    componentDidMount(){
        axios.get('/posts').then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState(prevState => ({
            addPost: {
                ...prevState.addPost,
                [name]: value
            }
        }))
    }

    addPost = newPost => {
        const { title, body, imgUrl } = newPost
        if(title.trim().length > 0 && body.trim().length > 0 && imgUrl.trim().length > 0){
            axios.post('/posts', newPost).then(res => {
                this.setState(prevState => ({
                    posts: [...prevState.posts, res.data],
                    formToggle: false,
                }))
            })
        }
    }

    handleDelete = id => {
        axios.delete(`/posts/${id}`).then(res => {
            this.setState(prevState => ({
                posts: prevState.posts.filter(post => post._id !== id)
            }))
        })
    }

    formToggler = () => {
        this.setState(prevState => ({
            formToggle: !prevState.formToggle
        }))
    }

    render(){
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" render={props => <Auth {...props}/> }/>
                    <Route exact path="/posts" render={(props) =>  
                                                    <PostsPage 
                                                        {...props} 
                                                        addPost={this.addPost}
                                                        handleDelete={this.handleDelete}
                                                        inputs={this.state.addPost}
                                                        posts={this.state.posts}
                                                        formToggle={this.state.formToggle}
                                                        formToggler={this.formToggler}/>} 
                                                    />
                    <Route 
                        path="/profile" 
                        render={props => <Profile {...props}/> } />
                </Switch> 
                <Footer />
            </div>
        )
    }
}

export default App