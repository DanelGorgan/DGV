const multer = require('multer')
const path = require('path')
const serverHandle = require('../helpers/serverHandler.js')
const fs = require('fs');

module.exports.uploading = (req, res, callback) => {
    console.log('suntem aici')

    const storage = multer.diskStorage({
        destination: './view/img/',
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    function checkFileType(file, cb) {
        console.log('suntem iaici')
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
        // console.log(req.file)
        return req.file
    })
}


