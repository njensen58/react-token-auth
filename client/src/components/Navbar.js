import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = props => {
    const { authenticated, logout } = props
    return (
        <div className="nav">
            <Link to="/posts">Posts</Link>
            <Link to="/profile">Profile</Link>
            {authenticated && <button onClick={ logout }>Logout</button>}
        </div>
    )
}

export default Navbar