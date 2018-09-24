import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = props => {
    const { logout } = props
    return (
        <div className="nav">
            <Link to="/posts">Posts</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={ logout }>Logout</button>
        </div>
    )
}

export default Navbar