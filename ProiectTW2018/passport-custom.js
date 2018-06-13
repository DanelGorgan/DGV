// const JwtStrategy = require('passport-jwt').Strategy;
// const config = require('./config')
// const User = require('./models/user')
//
// module.exports = passport => {
//
//     let opts = {
//         jwtFromRequest:null, // aici token luam de pe front jwt,
//         secretOrKey: config.secret
//     }
//
//     passport.use (new JwtStrategy(opts, (payload,done) => {
//         User
//             .check(username)
//             .then(user => {
//                 if(user){
//                     done(null,user)
//                 } else {
//                     done(null,user)
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }))
// }