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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Post', postSchema)