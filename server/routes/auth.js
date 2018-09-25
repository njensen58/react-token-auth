const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')


authRouter.post("/signup", (req, res) => {
    // try to find a user with the provided username. (If it already exists, we want to tell them
        // that the username is already taken.)
    User.findOne({username: req.body.username }, (err, existingUser) => {
        if (err) return res.status(500).send({success: false, err})
        // If the db doesn't return "null" it means there's already a user with that username.
        if (existingUser !== null){
            return res.status(400).send({success: false, err: "That username is already taken"})
        }
        // If the function reaches this point and hasn't returned already, we're safe
        // to create the new user in the database.
        const newUser = new User(req.body)
        newUser.save((err, user) => {
            if (err) return res.status(500).send({success: false, err})
             // If the user signs up, we might as well give them a token right now
            // So they don't then immediately have to log in as well
            const token = jwt.sign(user.toObject(), process.env.SECRET)
            return res.status(201).send({success: false, user: user.toObject(), token})
        })
    })
})

authRouter.post("/login", (req, res) => {
    // Try to find the user with the submitted username (lowercased)
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) return res.status(500).send(err)
        // If that user isn't in the database OR the password is wrong:
        if (!user || user.password !== req.body.password){
            return res.status(403).send({success: false, err: "Email or Password are incorrect"})
        }
        // If username and password both match an entry in the database,
        // create a JWT! Add the user object as the payload and pass in the secret.
        // This secret is like a "password" for your JWT, so when you decode it
        // you'll pass the same secret used to create the JWT so that it knows
        // you're allowed to decode it.
        const token = jwt.sign(user.toObject(), process.env.SECRET)
        // Send the token back to the client app.
        return res.send({token, user: user.toObject(), success: true})
    })
})


module.exports = authRouter