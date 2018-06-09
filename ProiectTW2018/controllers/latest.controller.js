const RecipeModel = require('../models/recipe');

module.exports.search = (req, res, query) => {
    RecipeModel
        .search(query.name, (recipe) => {
            let response =[]
            for (let i = 0; i < recipe.length; i++) {
                response.push(recipe[i].name)
            }
            if (recipe.length > 0) {
                res.end(JSON.stringify(response))
            } else {
                res.end('Failure')
            }
        })
}



