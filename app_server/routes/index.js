const express = require('express');
const router = express.Router();

const travelController = require('../controllers/travel');

router.get('/', travelController.index);
router.get('/about', travelController.about);
router.get('/contact', travelController.contact);

module.exports = router;