const {Schema, model} = require('mongoose');

const fruitSchema = new Schema({
    name: {type: String, required: true, unique: true},
    color: {type: String, required: true},
    isReadyToEat: {type: Boolean, default: false},
});

module.exports = model('Fruit', fruitSchema)
