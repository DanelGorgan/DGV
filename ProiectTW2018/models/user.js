const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

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
    console.log('suntem aici in check')
    User.find({email: email, username: username}, function (err, user) {
        if(err) {
            console.log('eroare mancatias')
        }
        console.log('avem userul ' + user)
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
            console.log('Userul este ' + user)
            console.log(password)
            if (user) {
                return bcrypt.compare(password, user.password)
                    .then(itMatches => {
                        console.log('itMatches este ' + itMatches)
                        if (itMatches) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject();
                        }
                    });
            } else {
                 return Promise.reject();
            }
        });
}