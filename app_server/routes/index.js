const express = require('express');
const router = express.Router();

const travelController = require('../controllers/travel');

router.get('/', travelController.index);
router.get('/about', travelController.about);
router.get('/contact', travelController.contact);
router.get('/travel', travelController.travel);

module.exports = router;
