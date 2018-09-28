const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
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
            return res.status(201).send({success: true, user: user.withoutPassword(), token})
        })
    })
})

authRouter.post("/login", (req, res) => {
    // Try to find the user with the submitted username (lowercased)
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) return res.status(500).send(err)
        // If that user isn't in the database OR the password is wrong:
        if (!user){
            return res.status(403).send({success: false, err: "Username or Password are incorrect"})
        }

        // Use our checkPassword method to see if the password matches
        user.checkPassword(req.body.password, (err, match) => {
            if (err) return res.status(500).send(err)
            if (!match) res.status(401).send({success: false, message: "Username or Password are incorrect"})
            // if the password matches, lets create the token and send that and the user info to the client
            const token = jwt.sign(user.toObject(), process.env.SECRET)
            return res.send({token, user: user.withoutPassword(), success: true})
        })
        
    })
})


module.exports = authRouter