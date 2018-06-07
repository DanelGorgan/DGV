const serverHandle = require('./helpers/serverHandler.js')
const http = require('http');
const mongo = require('./models/connection.js')
const router = require('./routes/Routes')
const register = require('./controllers/register.controller')
// const bodyParser = require('body-parser')

//connect with mongoose
mongo.mongoose

// // create application/json parser
// var jsonParser = bodyParser.json()

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
            //aici o sa punem functia care pune in baza de date
            console.log('intram in register')
            register.register(req,res)
            break;
        case '/Login':
            router.recipesRoute(req, res);
            break;
        case '/myAccount':
            router.recipesRoute(req, res);
            break;
        default:
            serverHandle.serverHandler(req, res);
        // res.send({message: 'success'})
    }
}).listen(8125, () => {
    console.log('Server running at http:localhost:8125/');
});

