const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.post('/register', userController.register);
router.post('/login', userController.login);
// router.get('./getProfile', authenticate, userController.getProfile);
// router.put('./updateProfile', authenticate, userController.updateProfile);
// router.delete('./deleteAccount', authenticate, userController.deleteAccount);

module.exports = router;

