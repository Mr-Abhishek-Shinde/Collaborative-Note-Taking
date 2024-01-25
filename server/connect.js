require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to the database');
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3001, ()=>{
    console.log("Server is running")
})
