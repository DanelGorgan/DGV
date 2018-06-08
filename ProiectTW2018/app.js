const serverHandle = require('./helpers/serverHandler.js')
const http = require('http');
const mongo = require('./models/connection.js')
const router = require('./routes/Routes')
const register = require('./controllers/register.controller')
const login = require('./controllers/login.controller')
const addRecipe = require('./controllers/addRecipe.controller')

//connect with mongoose
mongo.mongoose

http.createServer(function (req, res) {

    let path = req.url;
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
        case '/Register/submit':
            if (req.method == 'POST') {
                register.register(req, res)
            }
            break;
        case '/Login':
            router.recipesRoute(req, res);
            break;
        case '/Login/submit':
            if (req.method == 'POST') {
                login.login(req, res)
            }
            break;
        case '/myAccount':
            router.recipesRoute(req, res);
            break;
        case '/addRecipe':
            router.recipesRoute(req, res);
            break;
        case '/addRecipe/submit':
            if (req.method == 'POST') {
                addRecipe.addR(req, res)
            }
            break;
        default:
            serverHandle.serverHandler(req, res);
    }
}).listen(8125, () => {
    console.log('Server running at http:localhost:8125/');
});

