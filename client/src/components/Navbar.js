import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="nav">
            <Link to="/posts">Posts</Link>
            <Link to="/profile">Profile</Link>
        </div>
    )
}

export default Navbar