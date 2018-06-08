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
    regim: {
        required: true,
        type: String
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
    }
});

const Recipes = mongoose.model('recipes', recipeSchema);

module.exports.check = (name, description,callback) => {
    Recipes.find({name: name, description: description}, function (err, recipe) {
        callback(recipe)
    });
}

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
        dotari: [],
        gastronomy: gastronomy,
        duration: duration,
        ingredients: []
    });
     for (let i = 0; i< dotari.length; i++) {
         newRecipe.dotari.push(dotari[i])
     }
    for (let i = 0; i< ingredients.length; i++) {
        newRecipe.ingredients.push(ingredients[i])
    }
    return newRecipe.save();
}

// module.exports.get = () => {
//     return Todo.find();
// }
//
// module.exports.delete = id => {
//     return Todo.findOneAndRemove({_id : id});
// }