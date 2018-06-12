// const url = require('url')
//
// module.exports.parseQuery = (req, res) => {
//     let url_parts = url.parse(req.url, true);
//     let query = url_parts.query;
//    // query = JSON.stringify(query.name)
//     return query;
// }

module.exports.parseName = (name) => {
    name = name.trim()
    name = name.toLowerCase().charAt(0).toUpperCase() + name.slice(1)
    name = name.split(/[ ,]+/);
    let newName = ''
    for (let i = 0; i < name.length; i++) {
        newName += name[i] + ' '
    }
    newName = newName.trim()
    return newName
}


module.exports.query = (req) => {
    let q = req.url.split('?'), result = {};
    if (q.length >= 2) {
        q[1].split('&').forEach((item) => {
            try {
                result[item.split('=')[0]] = item.split('=')[1];
            } catch (e) {
                result[item.split('=')[0]] = '';
            }
        })
    }
    return result;
}
