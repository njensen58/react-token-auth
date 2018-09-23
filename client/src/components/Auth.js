import React, { Component } from 'react'
import AuthForm from './AuthForm'

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            userForm: {
                username: '',
                password: ''
            },
            formToggle: false
        }
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState(prevState => ({
            userForm: {
                ...prevState.userForm,
                [name]: value
            }
        }))
    }



    toggle = () => {
        this.setState(prevState => ({
            formToggle: !prevState.formToggle
        }))
    }

    render(){
        return (
            <div>
                {this.state.formToggle 
                    ? <div>
                        <span style={{ backgroundColor: 'blue'}}>Login</span>
                        <span>Sign Up</span>
                     </div>
                    : <div>
                        <span>Login</span>
                        <span style={{ backgroundColor: 'blue'}}>Sign Up</span>     
                    </div>
                }
                {!this.state.formToggle ? <span onClick={this.toggle}>-Already a Member?</span> : <span onClick={this.toggle}>-New Member?</span>}
                {!this.state.formToggle 
                    ? <AuthForm 
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            username={this.state.username}
                            password={this.state.password}
                            btnText="Sign Up"/>
                    : <AuthForm 
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            username={this.state.username}
                            password={this.state.password}
                            btnText="Login"/>
                }   
            </div>
        )
    }
}

export default Auth