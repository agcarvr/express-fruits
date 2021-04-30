const express = require('express');
const User = require('../models/User')
const router = express.Router()


router.get('/', (req, res) => {
    const userQuery = User.find({}).select('-password').populate('fruits');

    userQuery.exec((err, foundUsers) => {
        if(err){
            console.log(err);
            res.status(401).json({msg: err.message});
        }else{
            res.status(200).json(foundUsers)
        }
    })
})


router.post('/addFruitToUser/:username', (req, res) => {
    const fruit = req.body;
    User.findOneAndUpdate({username: req.body.username}, { $addToSet: {fruits: fruit._id}}, {new: true})
    addFruitQuery.exec((err, updatedUser) => {
        if(err){
            res.status(400).json({
                msg: err.message
            })
        }else{
            res.status(200).json({
                msg: 'Updated user with ' + fruit.name
            })
        }
    })
})


module.exports = router