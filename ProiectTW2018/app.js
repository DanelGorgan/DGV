const serverHandle = require('./helpers/serverHandler.js')
const config = require('./config')
const http = require('http');
const mongo = require('./models/connection.js')
const router = require('./routes/Routes')
const register = require('./controllers/register.controller')
const login = require('./controllers/login.controller')
const addRecipe = require('./controllers/addRecipe.controller')
const search = require('./controllers/search.controller')
const filter = require('./controllers/filter.controller')
const latest = require('./controllers/latest.controller')
const upload = require('./controllers/upload.controller')
const recipe = require('./controllers/recipe.controller')
const myRecipe = require('./controllers/myrecipe.controller')
const query = require('./helpers/stringParser')

//connect with mongoose
mongo.mongoose

http.createServer(function (req, res) {
    let path = req.url.replace(/%20/g, " ");
    var params = query.query(req)
    req.params = params

    var auth = req.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
    console.log("Authorization Header is: ", auth);

    switch (path) {
        case '/recipes':
            router.recipesRoute(req, res);
            break;
        case `/recipe/?name=${req.params.name}`:
            router.recipeRoute(req, res);
            break;
        case '/recipe':
            router.recipesRoute(req, res);
            break;
        case '/getRecipe':
            if (req.method == 'POST') {
                recipe.getDetails(req, res)
            }
            break;
        case '/getMyRecipes':
            if (req.method == 'POST') {
                myRecipe.getDetails(req, res)
            }
            break;
        case '/myRecipes':
            router.recipesRoute(req, res);
            break;
        case '/Register':
            if (req.method == 'POST') {
                register.register(req, res)
            } else {
                router.recipesRoute(req, res);
            }
            break;
        case '/Login':
            if (req.method == 'POST') {
                login.login(req, res)
            } else {
                router.recipesRoute(req, res);
            }
            break;
        case '/myAccount':
            router.recipesRoute(req, res);
            break;
        case '/addRecipe':
            if (req.method == 'POST') {
                addRecipe.addR(req, res)
            } else {
                router.recipesRoute(req, res);
            }
            break;
        case '/latest':
            if (req.method == 'GET') {
                latest.getNew(req, res)
            }
            break;
        case '/upload':
            if (req.method == 'POST') {
                upload.uploading(req, res)
            } else {
                router.recipesRoute(req, res);
            }
            break;
        case '/filter':
            if (req.method == 'POST') {
                filter.filter(req, res)
            }
            break;
        case '/search':
            if (req.method == 'POST') {
                search.search(req, res)
            }
            break;
        default:
            serverHandle.serverHandler(req, res);
    }
}).listen(config.port, () => {
    console.log(`Server running at http:localhost:${config.port}/`);
});

