const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Fruit = require('../models/Fruit');


router.get('/', (req, res) => {
   const userQuery = User.find({}).select('-password').populate('fruits') 
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
router.post('/addFruitToUser/:username', (req, res) =>{
    const fruit = req.body
    const addFruitQuery = User.findOneAndUpdate({ username: req.params.username }, { $addToSet: { fruits: fruit._id }}, {new: true})
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

router.get('/:username', (req, res) => {
    const userQuery = User.findOne({username: req.params.username}).select('-password').populate('fruits')

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