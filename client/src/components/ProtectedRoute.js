import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
    render(){
        const { isAuthenticated, path, neededProps } = this.props
        const Component = this.props.component
        return (
            isAuthenticated 
                ? <Route path={ path } render={props => <Component {...props} {...neededProps}/> }/>
                : <Redirect to="/"/>
        )
    }
}

export default ProtectedRoute