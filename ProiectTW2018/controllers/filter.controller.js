const RecipeModel = require('../models/recipe');

module.exports.filter = (req, res) => {

    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', function () {
        body = JSON.parse(body)
        RecipeModel
            .checkFilter(body, (recipe) => {
                if (recipe.length > 0) {
                    res.end(JSON.stringify(recipe))
                } else {
                    res.end('Failure')
                }
            })
    })
}



