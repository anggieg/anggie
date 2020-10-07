const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authToken = require('../middlewares/authToken')

// routes for user CRUD API
router.get('/', authToken, userController.getUsers);
router.post('/', authToken, userController.postUser);
router.patch('/:userId', authToken, userController.updateUser);
router.delete('/:userId', authToken, userController.deleteUser);
router.get('/getUserByAccNo/:accNo', authToken, userController.getUserByAccNo);
router.get('/getUserByIdentityNo/:identityNo', authToken, userController.getUserByIdentityNo);

module.exports = router;