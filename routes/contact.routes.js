const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts.controller');
const contactsMiddleware = require('../middleware/contacts.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'contact-avatars',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(undefined, 'avatar');
    }
});
const parser = multer({ storage: storage });
const secure = require('../middleware/secure.middleware');

router.get('/', secureMiddleware.isAuthenticated, contactController.list);
router.get('/:id', secureMiddleware.isAuthenticated, contactsMiddleware.checkValidId, contactController.get);
router.post('/new', secureMiddleware.isAuthenticated, uploadConfig.single('image'), secureMiddleware.canEditContact, contactController.create);
router.put('/edit/:id', secureMiddleware.isAuthenticated, uploadConfig.single('image'), secureMiddleware.canEditContact, contactsMiddleware.checkValidId, contactController.edit);
router.delete('/delete/:id', secureMiddleware.isAuthenticated, contactsMiddleware.checkValidId, contactController.delete);

module.exports = router;