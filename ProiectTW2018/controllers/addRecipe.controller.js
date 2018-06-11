const RecipeModel = require('../models/recipe');
const upload = require('./upload.controller')

module.exports.addR = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        if (body) {
            body = JSON.parse(body)
            RecipeModel.check(body.name, body.description, (recipe) => {
                if (recipe.length === 0) {
                    RecipeModel.create(body.name, body.description, body.style,
                        body.difficulty, body.link, body.post, body.regim, body.dotari,
                        body.gastronomy, body.duration, body.ingredients, body.user)
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end('Success')
                } else {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end('Failure')
                }
            })
        }
    });
}


