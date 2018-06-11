const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    style: {
        required: true,
        type: String
    },
    difficulty: {
        required: true,
        type: String
    },
    link: {
        required: true,
        type: String
    },
    post: {
        required: true,
        type: String
    },
    regim: {
        required: true,
        type: Array
    },
    dotari: {
        required: true,
        type: Array
    },
    gastronomy: {
        required: true,
        type: String
    },
    duration: {
        required: true,
        type: Number
    },
    ingredients: {
        type: Array,
        required: true,
    },
    user: {
        required: true,
        type: String
    },
    picture: {}

});

module.exports = mongoose.model('recipes', recipeSchema);
