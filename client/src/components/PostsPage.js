import React, { Component } from 'react'
import Post from './Post'
import Form from '../shared/Form'
import AddPostForm from './AddPostForm'
import axios from 'axios'


const PostsPage = props => {
    return (
        <div className="posts-page">
            {/* Toggles Form */}
            <button onClick={props.formToggler}>{ props.formToggle ? "Close" : "New Post" }</button>

            {/* Add Post Form */}
            {props.formToggle &&
                <React.Fragment>
                    <Form 
                        render={props => <AddPostForm {...props}/>}
                        inputs={{ title: '', body: '', imgUrl: '' }}
                        submit={inputs => props.addPost(inputs)}
                        reset
                    />
                       
                </React.Fragment>
            }

            {/* Background Overlay when Form is open */}
            { props.formToggle && <div className="page-overlay"></div> }

            {/* Mapped Out Posts */}
            <div className="posts-container">
                { props.posts.map(post => <Post 
                                            {...post} 
                                            key={ post._id } 
                                            handleDelete={ props.handleDelete }/>) 
                }
            </div>

        </div>
    )
}


export default PostsPage