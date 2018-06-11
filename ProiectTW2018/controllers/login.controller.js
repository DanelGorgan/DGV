const UserModel = require('../models/user');

module.exports.login = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        if (body) {
            body = JSON.parse(body)
            UserModel
                .login(body.email, body.password)
                .then(() => {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('Success');
                    console.log('success')
                })
                .catch(err => {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    console.log('eroarea este ' + err)
                    res.end('Failure')
                })
        }
    });

}


