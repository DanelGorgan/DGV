const RecipeModel = require('../models/recipe');
const json2csv = require('json2csv').parse;

const fields = [ 'name' ,'description','style' ,'difficulty' ,'link' ,'post' ,'regim' ,'dotari' ,'gastronomy' ,'duration' ,'ingredients','user' ,'picture:']
const opts = { fields };
module.exports.getCSV = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', function () {
        if (body) {
            body = JSON.parse(body)
            RecipeModel.get(body.name ,(recipe) => {
                if (recipe.length > 0) {
                    try {
                        const csv = json2csv(recipe, opts);
                        console.log(csv)
                        res.writeHead(200, {"Content-Type": 'text/csv'});
                        res.end(csv)
                    } catch (err) {
                        console.error(err);
                    }

                } else {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end('Nu exista aceasta reteta')
                }
            })
        }
    });
}



