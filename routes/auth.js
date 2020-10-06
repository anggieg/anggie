const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/generateAuthToken', authController.generateAuthToken);

module.exports = router;