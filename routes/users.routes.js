const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const secureMiddleware = require('../middleware/secure.middleware');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'user-avatars',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(undefined, 'avatar');
    }
});
const parser = multer({ storage: storage });

router.post('/', usersController.create);
router.put('/', secureMiddleware.isAuthenticated, usersController.edit);

module.exports = router;