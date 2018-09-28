const express = require('express')
const profileRouter = express.Router()
const expressJwt = require('express-jwt')
const User = require('../models/user')

const auth = expressJwt({secret: process.env.SECRET})

profileRouter.use(auth)

profileRouter.get("/", (req, res) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        if (err) return res.status(500).send({success: false, err})
        if (user === null) return res.status(400).send({success: false, err:  "User Not Found" })
        return res.status(200).send({success: true, user: user.withoutPassword()})
    })
})




module.exports = profileRouter