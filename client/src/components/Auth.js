import React, { Component } from 'react'
import AuthForm from './AuthForm'
import Form from '../shared/Form'

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            formToggle: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            formToggle: !prevState.formToggle
        }))
    }

    render(){
        let signupErr = this.props.authErrCode.signup
        let loginErr = this.props.authErrCode.login
        let errMsg = ""
        if(signupErr < 500 && signupErr > 399){
            errMsg = "Invalid Username or Password!"
        } else if(signupErr > 499){
            errMsg = "Server Error"
        }

        if(loginErr < 500 && loginErr > 399){
            errMsg = "Invalid Username or Password"
        } else if(loginErr > 499){
            errMsg = "Server Error"
        }

        return (
            <div className="auth-page">
                {this.state.formToggle 
                    ? <div>
                        <span style={{ backgroundColor: 'cornflowerblue' }}>Login</span>
                        <span>Sign Up</span>
                      </div>
                    : <div>
                        <span>Login</span>
                        <span style={{ backgroundColor: 'cornflowerblue' }}>Sign Up</span>     
                      </div>
                }
                {!this.state.formToggle ? <span onClick={this.toggle}>-Already a Member?</span> : <span onClick={this.toggle}>-New Member?</span>}
                {!this.state.formToggle 
                    ? <Form 
                        inputs={{ username: '', password: '' }}
                        submit={inputs => this.props.signUp(inputs)}
                        render={props => <AuthForm {...props} btnText="Sign Up"/>}
                        reset/>
                    : <Form 
                        inputs={{ username: '', password: '' }}
                        submit={inputs => this.props.login(inputs)}
                        render={props => <AuthForm {...props} btnText="Login"/>}
                        reset/>
                }   
                <p>{errMsg}</p>
            </div>
        )
    }
}

export default Auth