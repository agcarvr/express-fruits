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
    let filters;
    if(Object.keys(req.query).length > 0){
        filters = {...req.query}
    }
    try{
        if(!filters){
            const foundFruits = await Fruit.find({});
            res.status(200).json(foundFruits)        
        }else{
            const foundFruits = await Fruit.find({...filters});
            res.status(200).json(foundFruits)
        }
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

//New

//Delete
app.delete('/fruits/:id', async (req, res) => {
    try{
        const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedFruit);
    } catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

//Update
app.put('/fruits/:id', async (req, res) => {
    try {
        const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedFruit);
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

//Create
app.post('/fruits', async (req, res) => {
    try {
        const createdFruit = await Fruit.create(req.body)
        res.status(200).json(createdFruit);
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

//Edit

//Show
app.get('/fruits/:id', async (req, res) => {
   try{
       const foundFruit = await Fruit.findById(req.params.id);
       res.status(200).json(foundFruit)
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

app.get('/fruitsByName/:name', async (req, res) => {
    try{
        const foundFruit = await Fruit.findOne({name: req.params.name});
        res.status(200).json(foundFruit)
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})
 



app.get('/', (request, response) => {
    response.send(`<h1>Something else</h1>`)
})




//always last
app.listen(PORT, () => console.log('im a server thats listening on port ', PORT))