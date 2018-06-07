const UserModel = require('../models/user');

module.exports.login = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        body = JSON.parse(body)
        UserModel
            .login(body.email, body.password)
            .then(() => {
                res.end('Success');
            })
            .catch(err => {
                console.log('eroarea este ' + err)
                res.end('Failure')
            })
    });
}


