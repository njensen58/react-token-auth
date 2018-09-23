const express = require('express')
const postRouter = express.Router()
const Posts = require('../models/post')

// GET ALL & POST
postRouter.route('/')
    .get((req, res) => {
        Posts.find((err, posts) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(posts)
        })
    })
    .post((req, res) => {
        const newPost = new Posts(req.body)
        newPost.save((err, newPost) => {
            if (err) return res.status(500).send(err)
            return res.status(201).send(newPost)
        })
    })

    
// GET ONE, PUT, DELETE
postRouter.route('/:id')
    .get((req, res) => {
        Posts.findOne({_id: req.params.id}, (err, post) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(post)
        })
    })
    .put((req, res) => {
        Posts.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true},
            (err, updatedPost) => {
                if (err) return res.status(500).send(err)
                return res.status(201).send(updatedPost)
            }
        )
    })
    .delete((req, res) => {
        Posts.findOneAndRemove({_id: req.params.id}, (err, deletedPost) => {
            if (err) return res.status(500).send(err)
            return res.status(201).send(deletedPost)
        })
    })

module.exports = postRouter