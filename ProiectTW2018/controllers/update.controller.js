const RecipeModel = require('../models/recipe');
const _ = require('lodash')

module.exports.update = (req, res) => {
    console.log('[update.controller] Incepem cautarea...')
    RecipeModel
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        if (body) {
            body = JSON.parse(body);
            RecipeModel
                .update(body, function (recipe) {
                    console.log('Am updatat')
                    console.log(_.size(recipe))
                    if (_.size(recipe) > 0) {
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end('Success');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end('Failure');
                    }
                })
        }
    });
}



