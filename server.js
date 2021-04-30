// import express from 'express'
// require all my modules
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { hash, jsonAuth, auth } = require('./controllers/authController');
const SECRET = process.env.SECRET_KEY
const User = require('./models/User');


const app = express();
const PORT = process.env.PORT || 8080;


//define my database and middleware
app.use(express.json());
app.use((req, res, next) => {
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
app.use('/users', require('./controllers/usersController'))



//Home route
app.get('/', (request, response) => {
    response.send(`<h1>Something else</h1>`)
})


app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = hash(password);

    User.findOne({username}, (err, foundUser) => {
        if(err){
            res.status(400).json({msg: err.message})
        }else{
            if(bcrypt.compareSync(hashedPassword, foundUser.password)){
                const token = jwt.sign({
                    id: foundUser._id,
                    username: foundUser.username
                }, SECRET)
                res.status(200).json({ token, bio: foundUser.bio})
            }else{
                res.status(500).json({
                    problem: 'the comparison did not work, did you change your hash algo'
                })
            }
        }
    })
})


app.post('/register', (req, res) => {
    const passwordHash = hash(req.body.password);
    req.body.password = bcrypt.hashSync(passwordHash, bcrypt.genSaltSync(10))

    User.create(req.body, (err, createdUser) => {
        if(err){
            console.log(err)
            res.status(400).json({
                msg: err.message
            })
        }else{
            const token = jwt.sign({
                id: createdUser._id,
                username: createdUser.username
            }, SECRET)
            res.status(200).json({
                token
            })
        }
    })
})





//always last
app.listen(PORT, () => console.log('im a server thats listening on port ', PORT))