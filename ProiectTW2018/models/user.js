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
        trim : true
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

// UserSchema.methods.comparePassword = function (password) {
//     return bcrypt.compare(password, this.password);
// }


module.exports.create = (username,email,password) => {
    let newUser = new User({
        username: username,
        email: email,
        password: password
    })

    return newUser.save().then(user => {
        return {
            _id: user._id,
            email: user.email
        }
    });
}

module.exports.login = (email, password) => {
    return User
        .findOne({email: email})
        .then(user => {
            console.log(user)
            console.log(password)
            // return user
            //     .comparePassword(password)
            let ok = bcrypt.compare(password, user.password)
            console.log('ok este ' + ok)
            if (ok) {
                return Promise.resolve()
            } else {
                return Promise.reject()
            }
            // .then(itMatches => {
            //     if (itMatches) {
            //         return Promise.resolve();
            //     } else {
            //         return Promise.reject();
            //     }
            // });
        });
}