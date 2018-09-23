const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    imgUrl: String,
    likes: Number,
    comments: [{
        comment: {
            type: String,
            required: true,
            timeStamp: Date
        },
    }],
    date: {
        type: Date
    }
})

module.exports = mongoose.model('Post', postSchema)