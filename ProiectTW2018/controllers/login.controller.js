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
                .then((jwt) => {
                    console.log(jwt)
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    console.log('body.email'+ body.email)
                    return UserModel.checkAdmin(body.email)
                        .then(result => {
                            console.log('[login.controller]Am primti de la mongo ')
                            console.log(result.length)
                            if (result.length > 0) {
                                res.write('Success ')
                                res.write('admin ')
                                res.end(`JWT ${jwt}`);
                            } else {
                                res.write('Success ')
                                res.write('notAdmin ')
                                res.end(`JWT ${jwt}`);
                            }
                        })
                        .catch(err => {
                            console.log('eroare la verificat admin: ' + err)
                        })

                })
                .catch(err => {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    console.log('[login.controller] Eroarea primita este ' + err)
                    res.end('Failure')
                })
        }
    });
}



