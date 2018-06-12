const multer = require('multer')
const path = require('path')
const Recipes = require('../models/recipeModel')

module.exports.uploading = (req, res) => {

    const storage = multer.diskStorage({
        destination: './view/img/',
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    function checkFileType(file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            console.log('--------------------')
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }

    const upload = multer({
        storage: storage,
        fileFilter: function(req, file, cb){
            checkFileType(file, cb);
        }
    }).single('myImage')

    upload(req, res, (err) => {
        console.log('[upload.controller] Updatam reteta cu poza')
        console.log(req.file.filename)
         return Recipes.findOneAndUpdate({
             query: {},
             sort: {$natural: -1},
             update: {$set: {picture: req.file.filename}}
         })
    })
}


