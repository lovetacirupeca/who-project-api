const mongoose = require('mongoose');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                next(new ApiError('User already registered', 400));
            } else {
                user = new User(req.body);
                user.save()
                    .then(() => {
                        res.json(user);
                    })
                    .catch(error => {
                        if (error instanceof mongoose.Error.ValidationError) {
                            next(new ApiError(error.message, 400, error.errors));
                        } else {
                            next(error);
                        }
                    });
            }
        })
        .catch(error => next(new ApiError(error, 500)));
}

module.exports.edit = (req, res, next) => {
    const user = req.user;
    if (req.body.name) {
        user.name = req.body.name;
    }
    if (req.body.password) {
        user.password = req.body.password;
    }
    if (req.body.password) {
        user.password = req.body.password;
    }
    if (req.body.imageUrl) {
        user.imageUrl = req.body.imageUrl;
    }
    user.save()
        .then(() => {
            res.json(user);
        })
        .catch(error => next(new ApiError(error, 500)));
}