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
const deletei = require('./controllers/delete.controller')
const update = require('./controllers/update.controller')
const format = require('./controllers/format.controller')
const user = require('./controllers/getUser.controller')
const query = require('./helpers/stringParser')
// const passport = require('passport')
// require('./passport-custom')(passport)

//connect with mongoose
mongo.mongoose

http.createServer(function (req, res) {
    let path = req.url.replace(/%20/g, " ");
    var params = query.query(req)
    req.params = params

    var auth = req.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
    //console.log(path)
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
        case '/getUser':
            if (req.method == 'POST') {
                user.getDetails(req, res)
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
        case '/myAccount1':
            if (auth) {
                console.log('VICTORIE')
                router.recipeRoute(req, res);
            }
            break
        case '/myAccount':
            // passport.authenticate('jwt', {session:false}, (req,res) => {
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
        case '/delete':
            if (req.method == 'DELETE') {
                deletei.deleteItem(req, res)
            }
            break;
        case '/update':
            if (req.method == 'POST') {
                update.update(req, res)
            }
            break;
        case '/updateUser':
            if (req.method == 'POST') {
                update.updateUser(req, res)
            }
            break;
        case '/modifyRecipe':
            router.recipesRoute(req, res);
            break;
        case '/json':
            if (req.method == 'POST') {
                recipe.getDetails(req, res)
            }
            break;
        case '/csv':
            if (req.method == 'POST') {
                format.getCSV(req, res)
            }
            break;
        default:
            serverHandle.serverHandler(req, res);
    }
}).listen(config.port, () => {
    console.log(`Server running at http:localhost:${config.port}/`);
});

