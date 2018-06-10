const UserModel = require('../models/user');

module.exports.register = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', function () {
        body = JSON.parse(body)
        console.log(body)
        console.log(body.username)
        console.log(body.email)
        UserModel.check(body.username, body.email, (user) => {
            console.log('user length este' + user.length)
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

