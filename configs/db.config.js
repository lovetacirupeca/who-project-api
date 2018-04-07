const mongoose = require('mongoose');
const DB_NAME = process.env.DB_NAME || '';
const MONGO_URI = process.env.MONGO_URI ||  '';

mongoose.Promise = Promise;
mongoose.connect(`${MONGO_URI}${DB_NAME}`)
    .then(() => {
        console.info(`Connect to db ${DB_NAME}`);
    })
    .catch(error => {
        console.error(`Unable to connect to db ${DB_NAME}: ${error}`);
    })