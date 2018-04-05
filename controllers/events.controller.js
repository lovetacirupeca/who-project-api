const mongoose = require('mongoose');
const Event = require('../models/event.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
    Event.find({ ownerId: req.user._id })
        .then(event => res.json(event))
        .catch(error => next(error));

}