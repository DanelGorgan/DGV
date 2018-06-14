const UserModel = require('../models/user');

module.exports.getDetails = (req, res) => {

    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        if (body) {
            body = JSON.parse(body)
                UserModel.get(body.email, (user) => {
                if (user) {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end(JSON.stringify(user))
                } else {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end('Failure')
                }
            })
        }
    });
}



