const RecipeModel = require('../models/recipe');

module.exports.getNew = (req, res) => {
    console.log('here')
    RecipeModel.getLatest((recipes) => {
        if (recipes.length > 0) {
            let response = []
            for (let i = 0; i < recipes.length; i++) {
                response.push(recipes[i].name)
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end(JSON.stringify(response))
        } else {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end('Failure')
        }
    })
}



