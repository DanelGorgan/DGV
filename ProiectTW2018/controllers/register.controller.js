const UserModel = require('../models/user');

module.exports.register = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        body = JSON.parse(body)
        let ok = UserModel.create(body.username, body.email, body.password)
        if (ok) {
            res.end('Success');
        } else {
            res.end('Failure');
        }
    });
}

