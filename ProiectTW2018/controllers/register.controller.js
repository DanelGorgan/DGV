const UserModel = require('../models/user');

module.exports.register = (req, res) => {
    console.log('estas aichi ')
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', function () {
        if(body){
            body = JSON.parse(body)
        }
        UserModel.check(body.username, (user) => {
            if (user.length === 0) {
                UserModel.create(body.username, body.email, body.password)
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end('Success')
            } else {
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end('Failure')
            }
        })
    });
}

