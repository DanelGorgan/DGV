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
        type: Boolean,
        default: false
    },
    regim: [],
    dotari: {
        required: true,
        type: String
    },
    gastronomy: {
        required: true,
        type: String
    },
    duration: {
        required: true,
        type: Number
    },
    ingredients: []
});

const Recipes = mongoose.model('recipes', recipeSchema);

module.exports.create = (name, description, style,
                         difficulty, link, post, regim, dotari,
                         gastronomy, duration, ingredients) => {
    let newRecipe = new Recipes({
        name: name,
        description: description,
        style: style,
        difficulty: difficulty,
        link: link,
        post: post,
        regim: regim,
        dotari: dotari,
        gastronomy: gastronomy,
        duration: duration,
        ingredients: ingredients
    });

    return newRecipe.save();
}

// module.exports.get = () => {
//     return Todo.find();
// }
//
// module.exports.delete = id => {
//     return Todo.findOneAndRemove({_id : id});
// }