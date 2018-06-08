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
                let response = []
                for (let i = 0; i < recipe.length; i++) {
                    response.push(recipe[i].name)
                }
                if (recipe.length > 0) {
                    res.end(JSON.stringify(response))
                } else {
                    res.end('Failure')
                }
            })
    })
}



