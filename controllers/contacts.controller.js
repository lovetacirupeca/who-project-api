const mongoose = require('mongoose');
const Contact = require('../models/contact.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
    Contact.find({ ownerId: req.user._id })
        .then(contacts => res.json(contacts))
        .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
    const id = req.params.id;
    Contact.find({ _id: id, ownerId: req.user._id })
        .then(contact => {
            if (contact) {
                res.json(contact)
            } else {
                next(new ApiError(`Contact not found`, 404));
            }
        }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
    console.log(req.file)
    
    req.body.ownerId = req.user._id;
    const contact = new Contact(req.body);
    contact.save()
        .then(() => {
            res.status(201).json(contact);
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
    Contact.findOneAndRemove({ _id: id, ownerId: req.user._id})
        .then(contact => {
            if (contact) {
                res.status(204).json();
            } else {
                next(new ApiError(error.message, 404));
            }
        })
        .catch(error => next(new ApiError(error.message, 500)));
}

module.exports.edit = (req, res, next) => {
    const id = req.params.id;
    Contact.findOneAndUpdate({ _id: id, ownerId: req.user._id }, { $set: req.body }, { new: true })
        .then(contact => {
            if (contact) {
                res.status(200).json(contact)
            } else {
                next(new ApiError(`Contact not found`, 404));
            }
        }).catch(error => next(error));
}