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
            formToggle: false,
            addPost: {
                title: '',
                body: '',
                imgUrl: ''
            }
        }
    }

    componentDidMount(){
        axios.get('/posts').then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    signUp = (e, userInfo) => {
        e.preventDefault()
        axios.post('/auth/signup', userInfo)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    login = (e, userInfo) => {
        e.preventDefault()
        axios.post('/auth/login', userInfo)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
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

    handleSubmit = e => {
        e.preventDefault()
        const { title, body, imgUrl } = this.state.addPost
        if(title.trim().length > 0 && body.trim().length > 0 && imgUrl.trim().length > 0){
            axios.post('/posts', this.state.addPost).then(res => {
                this.setState(prevState => ({
                    posts: [...prevState.posts, res.data],
                    addPost: {
                        title: '',
                        body: '',
                        imgUrl: ''
                    }
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
                    <Route exact path="/" render={ props => 
                                                    <Auth 
                                                        {...props} 
                                                        signUp={this.signUp} 
                                                        login={this.login}/>
                                                    }/>
                    <Route path="/posts" render={ props =>  
                                                    <PostsPage 
                                                        {...props} 
                                                        handleSubmit={this.handleSubmit}
                                                        handleChange={this.handleChange}
                                                        handleDelete={this.handleDelete}
                                                        inputs={this.state.addPost}
                                                        posts={this.state.posts}
                                                        formToggle={this.state.formToggle}
                                                        formToggler={this.formToggler}/>
                                                    }/>
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