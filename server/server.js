require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        app.listen(process.env.PORT, () => {
        console.log('Connected to db and Listening on port', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })