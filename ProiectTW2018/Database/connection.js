const mongoose = require('mongoose')

const config = require('../config');

mongoose.Promise = global.Promise;
mongoose
    .connect(config.database)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(`Error while connecting to db ${err}`);
    })

exports.mongoose = mongoose;