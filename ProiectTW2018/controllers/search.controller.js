const RecipeModel = require('../models/recipe');

module.exports.search = (req, res) => {
    console.log('[search.controller] Incepem cautarea...')
    RecipeModel
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () =>{
        if (body){
            body = JSON.parse(body);
            RecipeModel
                .search(body.name, function(recipe){

                        if (recipe.length > 0){
                            res.writeHead(200,{'Content-Type':'text/plain'});
                            res.end(JSON.stringify(recipe));
                        }else{
                            res.writeHead(200, {'Content-Type':'text/plain'});
                            res.end('Failure');
                        }
                })
        }
    });
}



