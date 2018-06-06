const serverHandle = require('./helpers/serverHandler.js')
const http = require('http');
const router = require('./routes/routerRouter')
const mongo = require('./Database/connection')


//connect with mongoose
mongo.mongoose


http.createServer(function (req, res) {
    var path = req.url;
    console.log('Requestul este ' + path)
    switch (path) {
        case '/recipes':
            router.recipesRoute(req, res);
            break;
        case '/recipe':
            router.recipesRoute(req, res);
            break;    
        case '/myRecipes':
            router.recipesRoute(req, res);
            break;
        case '/Register':
            router.recipesRoute(req, res);
            break;
        case '/Login':
            router.recipesRoute(req, res);
            break;
        default:
            serverHandle.serverHandler(req, res);
           // res.send({message: 'success'})
    }

}).listen(8125, () => {
    console.log('Server running at http:localhost:8125/');
});

