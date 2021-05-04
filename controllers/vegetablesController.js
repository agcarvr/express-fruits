const express = require('express');
const Vegetable = require('../models/Vegetable')
const router = express.Router()

//Index
router.get('/', async (req, res) => {
    let filters;
    if(Object.keys(req.query).length > 0){
        filters = {...req.query}
    }
    try{
        if(!filters){
            const foundVeggies = await Vegetable.find({});
            res.status(200).json(foundVeggies)        
        }else{
            const foundVeggies = await Vegetable.find({...filters});
            res.status(200).json(foundVeggies)
        }
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

//Create
router.post('/', async (req, res) => {
    try {
        const createdVegetable = await Vegetable.create(req.body)
        res.status(200).json(createdVegetable);
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

//Show
router.get('/:id', async (req, res) => {
    try{
        const foundVegetable = await Vegetable.findById(req.params.id);
        res.status(200).json(foundVegetable)
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

router.get('/ByName/:name', async (req, res) => {
    try{
        const foundVegetable = await Vegetable.findOne({name: req.params.name});
        res.status(200).json(foundVegetable)
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

//Update
router.put('/:id', async (req, res) => {
    try {
        const updatedVegetable = await Vegetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedVegetable);
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    try{
        const deletedVegetable = await Vegetable.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedVegetable);
    } catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})



module.exports = router