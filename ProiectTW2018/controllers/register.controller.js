const UserModel = require('../models/user');

module.exports.register = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.parse(body));
    });
}

// module.exports.register = (req, res) => {
//     console.log('we re here');
//     console.log(req.body.email)
//     UserModel
//         .create(req.body.email,req.body.password)
//         .then (user => {
//             res.end(user);
//         })
// }

