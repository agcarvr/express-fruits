const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Fruit = require('../models/Fruit');
const Vegetable = require('../models/Vegetable');
const {jsonAuth, auth} = require('./authController')


router.get('/', auth, (req, res) => {
   console.log(res.locals)
   const userQuery = User.find({}).select('-password').populate('fruits vegetables') 
   userQuery.exec((err, foundUsers) => {
       if (err){
           console.log(err);
           res.status(401).json({ msg: err.message });
       } else {
          res.status(200).json(foundUsers) 
       }
   })
})


// add fruits to users
// existing
router.post('/addFruitToUser', jsonAuth, (req, res) =>{
    console.log(res.locals)
    const fruit = req.body
    const addFruitQuery = User.findOneAndUpdate({ username: res.locals.user}, { $addToSet: { fruits: fruit._id }}, {new: true})
    addFruitQuery.exec((err, updatedUser) => {
        if (err){
            res.status(400).json({
                msg: err.message
            })
        } else {
            res.status(200).json({
                msg: 'Update User with ' + fruit.name
            })
        }
    })
})


router.post('/addFruit/:fruit/:username', (req, res) =>{
    const fruitQuery = Fruit.findOne({ name: req.params.fruit })
    fruitQuery.exec(( err, fruit ) => {
        if(err){
            res.status(400).json({
                msg: err.message
            })
        } else {
            const addFruitQuery = User.findOneAndUpdate({ username: req.params.username }, { $addToSet: { fruits: fruit._id }}, {new: true})
            addFruitQuery.exec((err, updatedUser) => {
                if(err){
                    res.status(400).json({
                        msg: err.message
                    }) 
                } else {
                    console.log(updatedUser);
                    res.status(200).json({
                        msg: `Updated ${updatedUser.username} with the fruit ${fruit.name} `
                    })
                }
            })
        }
    })
})


router.post('/addVegetableToUser', jsonAuth, (req, res) =>{
    const vegetable = req.body
    const addVegetableQuery = User.findOneAndUpdate({ username: res.locals.user }, { $addToSet: { vegetables: vegetable._id }}, {new: true})
    addVegetableQuery.exec((err, updatedUser) => {
        if (err){
            res.status(400).json({
                msg: err.message
            })
        } else {
            res.status(200).json({
                msg: `Updated ${res.locals.user} with ${vegetable.name}`
            })
        }
    })
})


router.post('/addVegetable/:vegetable/:username', (req, res) =>{
    const vegetableQuery = Vegetable.findOne({ name: req.params.vegetable })
    vegetableQuery.exec(( err, vegetable ) => {
        if(err){
            res.status(400).json({
                msg: err.message
            })
        } else {
            const addVegetableQuery = User.findOneAndUpdate({ username: req.params.username }, { $addToSet: { vegetables: vegetable._id }}, {new: true})
            addVegetableQuery.exec((err, updatedUser) => {
                if(err){
                    res.status(400).json({
                        msg: err.message
                    }) 
                } else {
                    console.log(updatedUser);
                    res.status(200).json({
                        msg: `Updated ${updatedUser.username} with the vegetable ${vegetable.name} `
                    })
                }
            })
        }
    })
})


router.get('/:username', auth, (req, res) => {
    const userQuery = User.findOne({username: req.params.username.toLowerCase()}).select('-password').populate('fruits vegetables')

    userQuery.exec((err, foundUser) => {
        if(err){
                res.status(400).json({
                msg: err.message
            })
        } else{
            res.status(200).json(foundUser)
        }
    })
})


// shows all fruits for a specific user
module.exports = router