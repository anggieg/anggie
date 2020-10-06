const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkToken = require('../middlewares/checkToken')

router.get('/', checkToken, userController.getUsers);
router.post('/', userController.postUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.get('/getUserByAccNo/:accNo', userController.getUserByAccNo);
router.get('/getUserByIdentityNo/:identityNo', userController.getUserByIdentityNo);

router.get('/testRedis', userController.testRedis);

module.exports = router;