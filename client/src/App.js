import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
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
                isAdmin: false,
                _id: ''
            },
            authErrCode: {
                signup: '',
                login: ''
            },
            isAuthenticated: false
        }
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
                this.authError("signup", err.response.status)
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
                this.authError("login", err.response.status)
            })
    }

    authenticate = user => {
        this.setState(prevState => ({
            user: {
                ...user
            },
            isAuthenticated: true
        }), () => {
            this.getData()
        })
        
    }

    logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        this.setState({
            user: {
                username: '',
                isAdmin: false,
                _id: ''
            },
            isAuthenticated: false
        }, () => {
            // this.props.history.push('/')
        })
    }

    authError = (key, errCode) => {
        this.setState(prevState => ({
            authErrCode: {
                ...prevState.authErrCode,
                [key]: errCode
            }
        }))
    }

    getData = () => {
        postsAxios.get('/api/posts').then(res => {
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
        const { isAuthenticated } = this.state
        return (
            <div>
                {/* Only show the navbar once the user is authenticated */}
                { this.state.isAuthenticated && <Navbar logout={this.logout}/> }
                <Switch>
                    <Route exact path="/" render={ props => isAuthenticated 
                                                    ?   <Redirect to="/posts"/>
                                                    :   <Auth 
                                                            {...props} 
                                                            signUp={this.signUp} 
                                                            login={this.login}
                                                            authErrCode={this.state.authErrCode}/>}/>
                    <ProtectedRoute 
                                path="/posts" 
                                redirectTo="/"
                                isAuthenticated={ isAuthenticated } 
                                render={() => 
                                    <PostsPage 
                                        {...this.props}
                                        addPost={this.addPost}
                                        posts={this.state.posts}
                                        handleDelete={this.handleDelete}
                                        formToggler={this.formToggler}
                                        formToggle={this.state.formToggle}/>} 
                                />
                    <ProtectedRoute 
                                path="/profile" 
                                isAuthenticated={ isAuthenticated }
                                redirectTo="/"
                                render={() => 
                                    <Profile user={this.state.user}/>
                                }/>
                </Switch> 
                <Footer />
            </div>
        )
    }
}

export default withRouter(App)