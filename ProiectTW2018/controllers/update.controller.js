const RecipeModel = require('../models/recipe');
const UserModel = require('../models/user');
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
            console.log('Am primit')
            console.log(body)
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

module.exports.updateUser = (req, res) => {
    console.log('[update.controller] Incepem cautarea...')
    RecipeModel
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        if (body) {
            body = JSON.parse(body);
            console.log('Am primit')
            console.log(body)
            UserModel
                .update(body, function (user) {
                    console.log('Am updatat')
                    console.log(user)
                    if (_.size(user) > 0) {
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



