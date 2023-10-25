const mongoose = require('mongoose');

const dietschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

const DietPlan = mongoose.model('DIET', dietschema);

module.exports = DietPlan;