const mongoose = require('mongoose');
const stringParser = require('../helpers/stringParser')

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

const Recipes = mongoose.model('recipes', recipeSchema);

module.exports.checkFilter = (json, callback) => {
    Recipes.find(json, function (err, recipe) {
        callback(recipe)
    });
}

module.exports.getLatest = (callback) => {
    console.log('re here')
    Recipes.find({}, function (err, recipe) {
        console.log('avem ' + recipe.length)
        callback(recipe)
    }).sort({$natural: -1}).limit(5)
}

module.exports.check = (name, description, callback) => {
    Recipes.find({name: name, description: description}, function (err, recipe) {
        callback(recipe)
    });
}

module.exports.search = (name, callback) => {

    let newName = stringParser.parseName(name)
    Recipes.find({
            name: {
                '$regex': decodeURIComponent(newName).replace(/[()]/g, ''),
                '$options': 'i'
            }
        },

        function (err, recipe) {
            callback(recipe)
        }
    )
}

module.exports.create = (name, description, style,
                         difficulty, link, post, regim, dotari,
                         gastronomy, duration, ingredients, user) => {
    let newRecipe = new Recipes({
        name: name,
        description: description,
        style: style,
        difficulty: difficulty,
        link: link,
        post: post,
        regim: [],
        dotari: [],
        gastronomy: gastronomy,
        duration: duration,
        ingredients: [],
        user: user,
        picture:{}
    });
    for (let i = 0; i < dotari.length; i++) {
        newRecipe.dotari.push(dotari[i])
    }
    const fields = ingredients.split(',');
    for (let i = 0; i < fields.length; i++) {
        newRecipe.ingredients.push(fields[i])
        console.log(i +' ' + fields[i])
    }
    for (let i = 0; i < regim.length; i++) {
        newRecipe.regim.push(regim[i])
    }
    console.log('Am salvat poza')

    // return newRecipe
    //     .save()
    //     .catch(err => {
    //         console.log('Eroarea este ' + err)
    //     })
}
