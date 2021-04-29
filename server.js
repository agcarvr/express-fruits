// import express from 'express'
// require all my modules
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Fruit = require('./models/Fruit');

const app = express();
const PORT = process.env.PORT || 8080;


//define my database and middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.body);
    next();
})

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})

mongoose.connection.once('connected', () => console.log('Connected to mongo life is good'))



app.use('/fruits', require('./controllers/fruitsController'))


app.get('/', (request, response) => {
    response.send(`<h1>Something else</h1>`)
})




//always last
app.listen(PORT, () => console.log('im a server thats listening on port ', PORT))