const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim : true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    password:{
        type: String,
        required: true
    }
});

let User = mongoose.model('User', UserSchema)

UserSchema.methods.comparePassword = function(password){
    return this.password == password;
}

module.exports.create = (username,email,password) => {
    let newUser = new User({
        username: username,
        email: email,
        password: password
    })

    return newUser.save().then(user =>{
        return{
            _id: user._id,
            email: user.email
        }
    });
}

module.exports.login = (email, password) =>{
    return User
        .findOne({email: email}).then(user => {
            return user.comparePassword(password)
                       .then( itMatches => {
                           if (itMatches){
                               return Promise.resolve();
                           } else{
                               return Promise.reject();
                           }
                       });
        });
}