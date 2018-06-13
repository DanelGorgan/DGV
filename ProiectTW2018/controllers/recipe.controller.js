const RecipeModel = require('../models/recipe');

module.exports.getDetails = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', function () {
        if (body) {
            //console.log('[recipe.controller] body = ' + body)
            body = JSON.parse(body)
            //console.log('[recipe.controller] body.name = ' + body.name)
            RecipeModel.get(body.name ,(recipe) => {
                if (recipe.length > 0) {
                    console.log('[recipe.controller] Trimitem '+ recipe+'####')
                    console.log('#########################################################################')
                    res.end(JSON.stringify(recipe))
                } else {
                    //console.log('NU AM GASIT RETETA!!!!!!!!!!!!!!!!!')
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end('Nu exista aceasta reteta')
                }
            })
        }
    });
}

