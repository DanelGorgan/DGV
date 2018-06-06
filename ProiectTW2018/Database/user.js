const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
<<<<<<< HEAD
        trim : true
=======
        trim: true
>>>>>>> 57440339896a06545b48220ef04f2193d7e772aa
    },
    email: {
        type: String,
        required: true,
        unique: true,
<<<<<<< HEAD
        trim : true
=======
        trim: true
>>>>>>> 57440339896a06545b48220ef04f2193d7e772aa
    },
    password: {
        type: String,
        required: true
    }
});

let User = mongoose.model('User', UserSchema)

UserSchema.methods.comparePassword = function (password) {
    return this.password == password;
}

<<<<<<< HEAD
module.exports.create = (username,email,password) => {
=======
module.exports.create = (username, email, password) => {
>>>>>>> 57440339896a06545b48220ef04f2193d7e772aa
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
        .findOne({email: email}).then(user => {
            return user.comparePassword(password)
                .then(itMatches => {
                    if (itMatches) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject();
                    }
                });
        });
}