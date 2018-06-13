const RecipeModel = require('../models/recipe');

module.exports.getDetails = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', function () {
        if (body) {
            body = JSON.parse(body)
            console.log('[myrecipe.controller] body.user = ' + body.user)
            RecipeModel.getByUser(body.user ,(recipe) => {
                console.log ('[myrecipe.controller] recipe = '  + recipe);
                if (recipe.length > 0) {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end(JSON.stringify(recipe))
                } else {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end('Nu exista aceasta reteta')
                }
            })
        }
    });
}

