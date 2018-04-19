const passport = require('passport');
const ApiError = require('../models/api-error.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        next(new ApiError('Email and password are required', 400));
    } else {
        passport.authenticate('local-auth', (err, user, message) => {
          
            if (err) {
                next(err);
            } else if (!user) {
                next(new ApiError(message, 401));
            } else {
                req.login(user, (err) => {
                    if (err) {
                        next(err);
                    } else {
                        res.json({ id: user._id, email: user.email });
                    }
                });
            }
        })(req, res, next);
    }
};

module.exports.destroy = (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Success' });
};

module.exports.getUser = (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => res.json(user))
        .catch(error => next(new ApiError(error, 500)))
}