const express = require('express');
const router = express.Router();
const eventController = require('../controllers/events.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const eventsMiddleware = require('../middleware/events.middleware');

router.get('/', secureMiddleware.isAuthenticated, eventController.list);
router.get('/:id', secureMiddleware.isAuthenticated, eventsMiddleware.checkValidId, eventController.get);
router.post('/new', secureMiddleware.isAuthenticated, eventController.create);
router.put('/edit/:id', secureMiddleware.isAuthenticated, eventsMiddleware.checkValidId, eventController.edit);
router.delete('/delete/:id', secureMiddleware.isAuthenticated, eventsMiddleware.checkValidId, eventController.delete);

module.exports = router;