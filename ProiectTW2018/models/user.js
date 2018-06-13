const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config')

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type:String,
        unique: false,
        required: false,
        trim: true
    },
    surname: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    phone: {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    adress: {
        type: String,
        unique: false,
        required: false,
        trim: true
    }
});


UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(user.password, salt))
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(next);
    }
});

let User = mongoose.model('User', UserSchema)

module.exports.check = (username, email,callback) => {
    User.find({email: email, username: username}, function (err, user) {
        callback(user)
    });
}
module.exports.create = (username, email, password) => {
    let newUser = new User({
        username: username,
        email: email,
        password: password
    })
    return newUser.save().then(user => {
        return {
            username: user.username,
            _id: user._id,
            email: user.email
        }
    });
}

module.exports.login = (email, password) => {
    return User
        .findOne({email: email})
        .then(user => {
            console.log('[user.js] Userul este ' + user)
            console.log(password)
            console.log(user.password)
            if (user) {
                return bcrypt.compare(password, user.password)
                    .then(itMatches => {
                        console.log('[user.js] itMatches este ' + itMatches)
                        if (itMatches) {
                            let payload = {
                                _id:user.id
                            }
                            let token = jwt.sign(payload, config.secret, {expiresIn: 6000000})

                            return Promise.resolve(token);
                        } else {
                            return Promise.reject();
                        }
                    });
            }   
        });
}
