const RecipeModel = require('../models/recipe');
module.exports.filter = (req, res) => {

    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', function () {
        body = body.split(',')
        let data = ''
        for (let i = 0; i < body.length; i++) {
            if (body[i] !== '' && i!=0) {
                data += body[i] + ','
            }
        }
        data = data.substring(0,data.length-3)
        data = '{' + data + '}'
        data = JSON.parse(data)
        console.log(data)
        RecipeModel
            .checkFilter(data, (recipe) => {
                if (recipe.length > 0) {
                    res.end(JSON.stringify(recipe))
                } else {
                    res.end('Failure')
                }
            })
    })
}



