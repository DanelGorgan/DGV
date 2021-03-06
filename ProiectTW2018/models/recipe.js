const stringParser = require('../helpers/stringParser')
const Recipes = require('./recipeModel')
const _ = require('lodash')

module.exports.checkFilter = (json, callback) => {
    Recipes.find(json, function (err, recipe) {
        console.log(recipe)
        callback(recipe)
    });
}

module.exports.getLatest = (callback) => {
    Recipes.find({}, function (err, recipe) {
        callback(recipe)
    }).sort({$natural: -1}).limit(5)
}

module.exports.get = (name, callback) => {
    //console.log('[recipe.js] functia get cauta numele ' + name)
    Recipes.find({name: name}, function (err, recipe) {
        //console.log('[recipe.js] functia get a gasit ' + recipe)
        callback(recipe)
    });
}

module.exports.getByUser = (user, callback) => {
    //console.log('[recipe.js] functia get cauta numele ' + name)
    if(user){
        Recipes.find({user: user}, function (err, recipe) {
            //console.log('[recipe.js] functia get a gasit ' + recipe)
            callback(recipe)
        });
    } else {
        Recipes.find({}, function (err, recipe) {
            //console.log('[recipe.js] functia get a gasit ' + recipe)
            callback(recipe)
        });
    }
}

module.exports.update = (json, callback) => {
    //console.log('[recipe.js] functia get cauta numele ' + name)
        Recipes.update({_id:json._id},{$set:json}, function (err, recipe) {
            //console.log('[recipe.js] functia get a gasit ' + recipe)
            callback(recipe)
        })
}


module.exports.check = (name, description, callback) => {
    Recipes.find({name: name, description: description}, function (err, recipe) {
        callback(recipe)
    });
}

module.exports.search = (name, callback) => {

    let newName = stringParser.parseName(name)
    console.log('[recipe] Cautam ' + newName)
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

module.exports.delete = (name,callback) => {
    Recipes.findOneAndRemove({name : name}, function (err, recipe) {
        if(err) {
            console.log('Nu am putut sterge')
        } else {
            callback(recipe)
        }
    })
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

