const express = require('express')
const postRouter = express.Router()
const Posts = require('../models/post')

// GET ALL & POST
postRouter.route('/')
    .get((req, res) => {
        // find posts by their user
        Posts.find({user: req.user._id}, (err, posts) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(posts)
        })
    })
    .post((req, res) => {
        const newPost = new Posts(req.body)
        // Add the user of the post to the new Post object
        newPost.user = req.user._id
        newPost.save((err, newPost) => {
            if (err) return res.status(500).send(err)
            return res.status(201).send(newPost)
        })
    })

    
// GET ONE, PUT, DELETE
postRouter.route('/:id')
    .get((req, res) => {
        Posts.findOne({_id: req.params.id, user: req.user._id}, (err, post) => {
            if (err) return res.status(500).send(err)
            // Send 404 status when no post is found
            if (!post) return res.status(404).send("No Post Found")
            return res.status(200).send(post)
        })
    })
    .put((req, res) => {
        Posts.findOneAndUpdate(
            // Add user to query
            {_id: req.params.id, user: req.user._id},
            req.body,
            {new: true},
            (err, updatedPost) => {
                if (err) return res.status(500).send(err)
                return res.status(201).send(updatedPost)
            }
        )
    })
    .delete((req, res) => {
        // Include criteria to search by user
        Posts.findOneAndRemove({_id: req.params.id, user: req.user._id}, (err, deletedPost) => {
            if (err) return res.status(500).send(err)
            return res.status(201).send(deletedPost)
        })
    })

module.exports = postRouter