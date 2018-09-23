import React, { Component } from 'react'

const Post = props =>  {
    const { handleDelete, _id, imgUrl, title, body } = props
    return(
        <div className="post">
            <div style={{ backgroundImage: `url(${imgUrl})`}}></div>
           
                <button onClick={ () => handleDelete( _id) }>X</button>
      
            <h3>{ title }</h3>
            <p>{ body }</p>
        </div>
    )

}

export default Post