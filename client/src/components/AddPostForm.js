import React from 'react'

const AddPostForm = props => {
    const { inputs: { title, body, imgUrl}, handleChange, handleSubmit } = props
    return (
        <form onSubmit={ handleSubmit } className="add-post-form">
            <input 
                type="text" 
                onChange={ handleChange } 
                value={ title } 
                name="title" 
                placeholder="Title"/>
            <textarea 
                type="text" 
                onChange={ handleChange } 
                value={ body } 
                name="body"
                rows={8}
                cols={12}
                placeholder="Body"></textarea>
            <input 
                type="text" 
                onChange={ handleChange } 
                value={ imgUrl } 
                name="imgUrl" 
                placeholder="Image url"/>
            <button>Add Post</button>
        </form>
    )
}

export default AddPostForm