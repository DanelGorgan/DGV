const RecipeModel = require('../models/recipe');

module.exports.addR = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        body = JSON.parse(body)
        console.log(body.dotari)
        RecipeModel
            .create(body.name, body.description, body.style,
                body.difficulty, body.link, body.post, body.regim, body.dotari,
                body.gastronomy, body.duration, body.ingredients)
            .then(() => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Success');
                console.log('success')
            })
            .catch(err => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Failure')
                console.log('eroarea este ' + err)
            })
    });
}


