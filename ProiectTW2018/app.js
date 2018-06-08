const serverHandle = require('./helpers/serverHandler.js')
const config = require('./config')
const http = require('http');
const mongo = require('./models/connection.js')
const router = require('./routes/Routes')
const stringParser = require('./helpers/stringParser')
const register = require('./controllers/register.controller')
const login = require('./controllers/login.controller')
const addRecipe = require('./controllers/addRecipe.controller')
const search = require('./controllers/search.controller')
const filter = require('./controllers/filter.controller')

//connect with mongoose
mongo.mongoose

http.createServer(function (req, res) {

    let query = stringParser.parseQuery(req,res);
    let path = req.url.replace(/%20/g, " ");

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
        case '/filter':
            if (req.method == 'POST') {
                filter.filter(req, res)
            }
            break;
        case `/search?name=${query.name}`:
            if (req.method == 'GET') {
                search.search(req, res, query)
            }
            break;
        default:
            serverHandle.serverHandler(req, res);
    }
}).listen(config.port, () => {
    console.log(`Server running at http:localhost:${config.port}/`);
});

