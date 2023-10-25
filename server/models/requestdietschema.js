const mongoose = require('mongoose');

const requestdietschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    prefer: {
        type: String,
    },
    avoid: {
        type: String,
    },
    goal: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true,
        default: false
    },
    plan: {
        type: String
    }
});

const RequestDietPlan = mongoose.model('REQUESTDIET', requestdietschema);

module.exports = RequestDietPlan;