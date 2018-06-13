const RecipeModel = require('../models/recipe');

module.exports.getDetails = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', function () {
        if (body) {
            body = JSON.parse(body)
            RecipeModel.get(body.name ,(recipe) => {
                if (recipe.length > 0) {
                    //console.log('[recipe.controller] Trimitem '+ recipe)
                    res.end(JSON.stringify(recipe))
                } else {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end('Nu exista aceasta reteta')
                }
            })
        }
    });
}

