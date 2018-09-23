const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)