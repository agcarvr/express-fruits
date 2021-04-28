// import express from 'express'
// require all my modules
require('dotenv').config()
console.log(process.env.MONGO_URI);
const express = require('express');


const app = express();
const PORT = process.env.PORT || 8080;


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
app.get('/fruits', (req, res) => {
    res.status(200).json(fruits)
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

app.get('/fruits/:id/display', (req, res) => {
    const id = parseInt(req.params.id)
    if (id !== id){
        res.status(404).send(`ur bad try again`)
    }else if(id >= fruits.length || id < 0){
        res.status(404).send(`<p>yeah no bud</p>`)
    }else {
        res.status(200).send(`<p>Your fruit is ${fruits[id].name}, it is ${fruits[id].color} and ${fruits[id].isReadyToEat? "is ready to eat": "is not ready to eat"}</p>`)
    }
})


app.get('/', (request, response) => {
    response.send(`<h1>Something else</h1>`)
})

app.get('/hello/:name', (req, res) => {
    res.send(`<h1>Hello ${req.params.name} its nice to meet you<h1>`)
})

app.get('/:thing', (req, res) => {
    res.send(`<h1>${req.params.thing}<h1>`)
})





//always last
app.listen(PORT, () => console.log('im a server thats listening on port ', PORT))