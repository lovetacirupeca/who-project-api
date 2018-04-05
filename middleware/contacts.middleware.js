const mongoose = require('mongoose');
const ApiError = require('../models/api-error.model');

module.exports.checkValidId = (req, res, next) => {
    const id = req.user.id;
    //console.log(req.user);
    if (mongoose.Types.ObjectId.isValid(id)) {
        next();
    } else {
        next(new ApiError(`Invalid contact id: ${id}`));
    }
}