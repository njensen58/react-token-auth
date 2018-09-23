import React from 'react'

const AuthForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <input 
                type="text" 
                onChange={props.handleChange} 
                value={props.username} 
                name="username" 
                placeholder="Username"/>
            <input 
                type="text" 
                onChange={props.handleChange} 
                value={props.password} 
                name="password" 
                placeholder="Username"/>
            <button>{props.btnText}</button>
        </form>
    )
}

export default AuthForm