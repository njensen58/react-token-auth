import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
    render(){
        const { isAuthenticated, path } = this.props
        const Component = this.props.componentName
        return (
            isAuthenticated 
                ? <Route path={ path } component={ Component }/>
                : <Redirect to="/" />
        )
    }
}

export default ProtectedRoute