// import express from 'express'
// require all my modules
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const Fruit = require('./models/Fruit');

const app = express();
const PORT = process.env.PORT || 8080;


//define my database and middleware
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})

mongoose.connection.once('connected', () => console.log('Connected to mongo life is good'))


const fruits = [
    {
        name: "apple",
        color: "red",
        isReadyToEat: true
    },
    {
        name: "grapes",
        color: "purple",
        isReadyToEat: true
    },
    {
        name: "bananas",
        color: "yellow",
        isReadyToEat: true
    },
]


// restful routs
// INDUCES
//Index
app.get('/fruits', async (req, res) => {
    try{
        const foundFruits = await Fruit.find({});
        res.status(200).json(foundFruits)        
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

//New

//Delete

//Update

//Create

//Edit

//Show
app.get('/fruits/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if (id !== id){
        res.status(404).json({
            msg: 'dude what are you doin'
        })
    }else if(id >= fruits.length || id < 0){
        res.status(404).json({
            msg: 'this value is out of bounds'
        })
    }else {
        res.status(200).json(fruits[id])
    }
})



app.get('/', (request, response) => {
    response.send(`<h1>Something else</h1>`)
})




//always last
app.listen(PORT, () => console.log('im a server thats listening on port ', PORT))