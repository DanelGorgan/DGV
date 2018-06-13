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
            return cb(null, true);
        } else {
            cb('Eroare: Doar imagini!');
        }
    }

    const upload = multer({
        storage: storage,
        fileFilter: function(req, file, cb){
            checkFileType(file, cb);
        }
    }).single('myImage')

    upload(req, res, (err) => {
        if (err) {
            res.end('[Error]Fisierul nu s-a putut incarca...Extensie gresita. \n Reuploadati din nou!')
        } else {
            console.log('[upload.controller] Updatam reteta cu poza')
            console.log('[upload controller]' + req.file.filename)
            Recipes.find({}).find({}, (err,recipes) => {
                console.log(recipes[0].name)
                Recipes.findOneAndUpdate({name:recipes[0].name}, {$set:{picture:req.file.filename}}, {new: true}, function(err, doc){
                    if(err){
                        console.log("Something wrong when updating data!");
                    }

                    console.log('Documentul modificat este ' + doc);
                });
            }).sort({$natural:-1});

        }


        // Recipes.findOneAndUpdate({
        //      query: {},
        //      sort: {$natural: -1},
        //      update: {$set: {picture: req.file.filename}}
        //  }, function(error, doc) {
        //      if(error){
        //          console.log(err)
        //      } else {
        //          console.log(doc)
        //      }
        // })
    })
}


