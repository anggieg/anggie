const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// route for authentication API
router.get('/generateAuthToken', authController.generateAuthToken);

module.exports = router;