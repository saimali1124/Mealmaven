const mongoose = require('mongoose');

const recipeschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
});

const Recipe = mongoose.model('RECIPE', recipeschema);

module.exports = Recipe;