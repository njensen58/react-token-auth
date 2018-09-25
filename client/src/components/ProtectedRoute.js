import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
    render(){
        const { isAuthenticated, redirectTo, path, neededProps } = this.props
        const Component = this.props.component
        return (
            !isAuthenticated ?
                <Redirect to={redirectTo}/> :
                this.props.render()
        )
    }
}

export default ProtectedRoute