const RecipeModel = require('../models/recipe');

module.exports.addR = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        console.log('Bdoy este----- ' + body)
        if (body) {
            body = JSON.parse(body)
            console.log('Am primit de pe front: ' + body)
            console.log('Am primit de pe front: ' + body.regim)
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


