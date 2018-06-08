const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

module.exports.serverHandler = (request, res) => {

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './view/html/recipe.ejs';
    } else {
        filePath = './view' + request.url;
    }
    let json = {
        name: "Personalizata",
        ingredients:["apa","paie","si bataie"],
        description:"descriere"
    }
    var htmlContent = fs.readFileSync(filePath, 'utf8');
    var htmlRenderized = ejs.render(htmlContent,json);
    res.end(htmlRenderized)
}