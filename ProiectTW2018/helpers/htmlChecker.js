var ok = 0;
module.exports.checkPath = (name) => {

    if(name === '/Register' || name === '/Login') {
        ok = 1;
    }
}

exports.ok = ok;