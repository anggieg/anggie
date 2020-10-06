const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/getToken', authController.getToken);

module.exports = router;