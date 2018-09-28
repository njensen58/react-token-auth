import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import PostsPage from './components/PostsPage'
import Profile from './components/Profile'
import Footer from './components/Footer'
import axios from 'axios'

let postsAxios = axios.create()
       
postsAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})


class App extends Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            formToggle: false,
            user: {
                username: '',
                isAdmin: false
            },
            isAuthenticated: false
        }
    }

    getData = () => {
        postsAxios.get('/api/posts').then(res => {
            this.setState({
                posts: res.data
            })
        })
    }


    signUp = userInfo => {
        axios.post('/auth/signup', userInfo)
            .then(res => {
                const {token, user} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                this.authenticate(user)
            })
            .catch(err => {
                console.log(err)
            })
    }

    login = userInfo => {
        axios.post('/auth/login', userInfo)
            .then(res => {
                const {token, user} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                this.authenticate(user)
            })
            .catch(err => {
                console.log(err)
            })
    }

    authenticate = user => {
        this.setState(prevState => ({
            user: {
                ...user
            },
            isAuthenticated: true
        }), () => {
            this.getData() // Client still has to manually navigate after authentication
        })
    }

    logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        this.setState({
            user: {
                username: '',
                isAdmin: false
            },
            isAuthenticated: false,
            posts: []
        }, () => {
            this.props.history.push('/') // Temporary Fix
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
            postsAxios.post('/api/posts', newPost).then(res => {
                this.setState(prevState => ({
                    ...prevState,
                    posts: [...prevState.posts, res.data],
                    formToggle: false,
                }))
            })
        }
    }

    handleDelete = id => {
        postsAxios.delete(`/api/posts/${id}`).then(res => {
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
                <Navbar logout={this.logout} authenticated={this.state.isAuthenticated}/>
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
                                                        addPost={this.addPost}
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

export default withRouter(App)