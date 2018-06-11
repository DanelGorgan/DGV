const RecipeModel = require('../models/recipe');

module.exports.getNew = (req, res) => {
    console.log('here')
    RecipeModel.getLatest((recipes) => {
        if (recipes.length > 0) {

            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end(JSON.stringify(recipes))
        } else {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end('Failure')
        }
    })
}



