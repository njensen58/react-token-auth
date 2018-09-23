const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const postRoutes = require('./routes/post')

app.use(express.json())
app.use(morgan('dev'))

// Connect to DB
mongoose.connect('mongodb://localhost:27017/react-auth', {useNewUrlParser: true}, () => {
    console.log('connected to the db')
}).catch(err => console.log(err))



app.use('/posts', postRoutes)



app.listen(5000, () => {
    console.log("Server is running on Port 5858")
})