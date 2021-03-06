const UserModel = require('../models/user');

module.exports.register = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', function () {
        if (body) {
            body = JSON.parse(body)

            UserModel.check(body.username, body.email, (user) => {
                console.log('userul este' + user)
                console.log('userul este' + user.length)
                if (user.length === 0) {
                    console.log('------------------------')
                    UserModel.create(body.username, body.email, body.password)
                        .then(() => {
                            res.writeHead(200, {"Content-Type": "text/plain"});
                            res.end('Success')
                        })
                        .catch(err => {
                            console.log('Eroarea este ' + err)
                            res.end('Failure')
                        })
                } else {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end('Failure')
                }
            })
        }
    });
}

