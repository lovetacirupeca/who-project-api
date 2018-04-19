const mongoose = require('mongoose');
const Event = require('../models/event.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
    Event.find({ ownerId: req.user._id })
        .populate('contacts')
        .then(event => res.json(event))
        .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
    const id = req.params.id;
    Event.find({ _id: id, ownerId: req.user._id })
        .then(event => {
            if (event) {
                res.json(event)
            } else {
                next(new ApiError(`Event not found`, 404));
            }
        }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
    console.log(req.body)
    const event = new Event(req.body);
    event.ownerId = req.user._id;
    event.save()
        .then(() => {
            res.status(201).json(event);
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.log(error);
                next(new ApiError(error.errors));
            } else {
                next(new ApiError(error.message, 500));
            }
        })
}

module.exports.delete = (req, res, next) => {
    const id = req.params.id;
    Event.findOneAndRemove({ _id: id, ownerId: req.user._id })
        .then(event => {
            if (event) {
                res.status(204).json();
            } else {
                next(new ApiError(error.message, 404));
            }
        })
        .catch(error => next(new ApiError(error.message, 500)));
}

module.exports.edit = (req, res, next) => {
    const id = req.params.id;
    Event.findOneAndUpdate({ _id: id, ownerId: req.user._id }, { $set: req.body }, { new: true })
        .then(event => {
            if (event) {
                res.status(200).json(event)
            } else {
                next(new ApiError(`Event not found`, 404));
            }
        }).catch(error => next(error));
}