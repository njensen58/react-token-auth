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
                    ? <Form 
                        inputs={{ username: '', password: '' }}
                        submit={inputs => props.signUp(inputs)}
                        render={props => <AuthForm {...props} btnText="Sign Up"/>}
                        reset/>
                    : <Form 
                        inputs={{ username: '', password: '' }}
                        submit={inputs => props.login(inputs)}
                        render={props => <AuthForm {...props} btnText="Sign Up"/>}
                        reset/>
                }   
            </div>
        )
    }
}

export default Auth