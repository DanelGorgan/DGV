const RecipeModel = require('../models/recipe');
const multer = require('multer')
const path = require('path')
// const serverHandle = require('../helpers/serverHandler.js')
const ejs = require('ejs')
const fs = require('fs');

module.exports.uploading = (req, res) => {
    console.log('aici')
    // serverHandle.serverHandler(req, res);

    //set storage engine
    const storage = multer.diskStorage({
        destination: './view/img/',
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    // Check File Type
    function checkFileType(file, cb) {
        console.log('suntem iaici')
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            console.log('--------------------')
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }


//init upload
    const upload = multer({
        storage: storage,
        fileFilter: function(req, file, cb){
            checkFileType(file, cb);
        }
    }).single('myImage')

    upload(req, res, (err) => {
        var filePath = './view/' + req.url;
        if (err) {
            var htmlContent = fs.readFileSync(filePath, 'utf8');
            var htmlRenderized = ejs.render(htmlContent, {
                msg: 'error'
            });
            res.end(htmlRenderized)
        } else {
            if (req.file == undefined) {
                res.end('Error: No File Selected!')
            } else {
                var htmlContent = fs.readFileSync(filePath, 'utf8');
                var htmlRenderized = ejs.render(htmlContent, {
                    msg: 'File Uploaded!',
                    file: `img/img1.jpg`
                });
                res.end(htmlRenderized)
            }
        }
    })
    res.end('ceva')
}


