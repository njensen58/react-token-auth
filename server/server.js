const express = require('express')
const app = express()
require("dotenv").config()
const expressJwt = require('express-jwt')
const morgan = require('morgan')
const mongoose = require('mongoose')
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')

app.use(express.json())
app.use(morgan('dev'))

// Connect to DB
mongoose.connect('mongodb://localhost:27017/react-auth', {useNewUrlParser: true}, () => {
    console.log('connected to the db')
}).catch(err => console.log(err))

// Decode JWT and add a 'req.body' on all request send to /api
app.use("/api", expressJwt({secret: process.env.SECRET}))





app.use('/auth', authRoutes)
app.use('/api/posts', postRoutes)




app.listen(5000, () => {
    console.log("Server is running on Port 5000")
})