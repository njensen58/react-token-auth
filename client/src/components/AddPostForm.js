import React from 'react'

const AddPostForm = props => {
    return (
        <form onSubmit={ props.handleSubmit } className="add-post-form">
            <input 
                type="text" 
                onChange={ props.handleChange } 
                value={ props.title } 
                name="title" 
                placeholder="Title"/>
            <textarea 
                type="text" 
                onChange={ props.handleChange } 
                value={ props.body } 
                name="body"
                rows={8}
                cols={12}
                placeholder="Body"></textarea>
            <input 
                type="text" 
                onChange={ props.handleChange } 
                value={ props.imgUrl } 
                name="imgUrl" 
                placeholder="Image url"/>
            <button>Add Post</button>
        </form>
    )
}

export default AddPostForm