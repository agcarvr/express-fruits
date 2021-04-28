// import express from 'express'
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (request, response) => {
    response.send(`<h1>Something else</h1>`)
})






//always last
app.listen(PORT, () => console.log('im a server thats listening on port ', PORT))