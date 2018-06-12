const stringParser = require('../helpers/stringParser')
const Recipes = require('./recipeModel')

module.exports.checkFilter = (json, callback) => {
    Recipes.find(json, function (err, recipe) {
        callback(recipe)
    });
}

module.exports.getLatest = (callback) => {
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
                         gastronomy, duration, ingredients, user, picture) => {
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
        picture: picture
    });
    for (let i = 0; i < dotari.length; i++) {
        newRecipe.dotari.push(dotari[i])
    }
    const fields = ingredients.split(',');
    for (let i = 0; i < fields.length; i++) {
        newRecipe.ingredients.push(fields[i])
        console.log(i + ' ' + fields[i])
    }
    for (let i = 0; i < regim.length; i++) {
        newRecipe.regim.push(regim[i])
    }

    return newRecipe
        .save()
        .catch(err => {
            console.log('[recipe.js]Eroarea este ' + err);
        })
}

module.exports.Recipes = Recipes;

