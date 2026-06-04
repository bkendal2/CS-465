const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');
const travelController = require('../controllers/travel');

router.get('/', mainController.index);
router.get('/about', mainController.about);
router.get('/contact', mainController.contact);
router.get('/travel', travelController.travel);

module.exports = router;