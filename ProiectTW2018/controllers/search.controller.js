const RecipeModel = require('../models/recipe');

module.exports.search = (req, res, query) => {
    RecipeModel
        .search(query.name, (recipe) => {
            if (recipe.length > 0) {
                res.end('Success')
            } else {
                res.end('Failure')
            }
        })
}



