import React from 'react'

const AuthForm = props => {
    const { inputs: { username, password }, handleChange, handleSubmit, btnText } = props
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                onChange={handleChange} 
                value={username} 
                name="username" 
                placeholder="Username"/>
            <input 
                type="text" 
                onChange={handleChange} 
                value={password} 
                name="password" 
                placeholder="Password"/>
            <button>{btnText}</button>
        </form>
    )
}

export default AuthForm