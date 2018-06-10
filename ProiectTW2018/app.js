const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
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
const latest = require('./controllers/latest.controller')
const upload = require('./controllers/upload.controller')

//connect with mongoose
mongo.mongoose

http.createServer(function (req, res) {

    let query = stringParser.parseQuery(req, res);
    let path = req.url.replace(/%20/g, " ");

    switch (path) {

        case '/recipes':
            renderHtmlDir(req, res)
            break;
        case '/recipe':
            renderHtmlDir(req, res)
            break;
        case '/myRecipes':
            renderHtmlDir(req, res)
            break;
        case '/Register':
            renderHtmlDir(req, res)
            break;
        case '/Register/submit':
            if (req.method == 'POST') {
                register.register(req, res)
            }
            break;
        case '/Login':
            renderHtmlDir(req, res)
            break;
        case '/Login/submit':
            if (req.method == 'POST') {
                login.login(req, res)
            }
            break;
        case '/MyAccount':
            renderHtmlDir(req, res)
            break;
        case '/addRecipe':
            renderHtmlDir(req, res)
            break;
        case '/addRecipe/submit':
            if (req.method == 'POST') {
                addRecipe.addR(req, res)
            }
            break;
        case '/upload.ejs':
                upload.uploading(req, res)
            break;
        case '/latest':
            if (req.method == 'POST') {
                latest.getNew(req, res)
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
            render(req, res);
    }
}).listen(config.port, () => {
    console.log(`Server running at http:localhost:${config.port}/`);
});

function render(req, res) {
    let action = req.url
    console.log(action)
    if(action == '/') {
        var filePath = './view/index.ejs'
        var htmlContent = fs.readFileSync(filePath, 'utf8');
        var htmlRenderized = ejs.render(htmlContent);
        res.end(htmlRenderized, 'binary')
    }
    let extension = req.url.substr(req.url.length - 4);
    switch (extension) {
        case '.png':
            var img = fs.readFileSync(__dirname + '/view/' + action);
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(img, 'binary');
            break;
        case '.jpg':
            var img = fs.readFileSync(__dirname + '/view/' + action);
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(img, 'binary');
            break;
        case '.css':
            var css = fs.readFileSync(__dirname + '/view/' + action);
            res.writeHead(200, {"Content-Type": "text/css"});
            res.end(css, 'binary');
            break;

    }
}

function renderHtmlDir(req, res) {
    let action = req.url

    if(action == '/') {
        var filePath = './view/index.ejs'
        var htmlContent = fs.readFileSync(filePath, 'utf8');
        var htmlRenderized = ejs.render(htmlContent);
        res.end(htmlRenderized, 'binary')
    } else {
        var filePath = './view/html' + action + '.ejs'
        console.log(filePath)
        var htmlContent = fs.readFileSync(filePath, 'utf8');
        var htmlRenderized = ejs.render(htmlContent);
        res.end(htmlRenderized, 'binary')
    }

    let extension = req.url.substr(req.url.length - 4);
    switch (extension) {
        case '.png':
            var img = fs.readFileSync(__dirname + '/view/' + action);
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(img, 'binary');
            break;
        case '.jpg':
            var img = fs.readFileSync(__dirname + '/view/' + action);
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(img, 'binary');
            break;
        case '.jpeg':
            var img = fs.readFileSync(__dirname + '/view/' + action);
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(img, 'binary');
            break;
        case '.css':
            var css = fs.readFileSync(__dirname + '/view/' + action);
            res.writeHead(200, {"Content-Type": "text/css"});
            res.end(css, 'binary');
            break;

    }
}


