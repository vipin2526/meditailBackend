const express = require('express');
const userController = require('../controllers/userController');
const { verifyJWT } = require('../middlewares/authMiddleware');
const consultController = require('../controllers/consultController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/', verifyJWT, userController.getUserDetails);
router.put('/update', verifyJWT, userController.updateUserDetails);
router.delete('/delete', verifyJWT, userController.deleteUser);
router.get('/protected', verifyJWT, userController.protected);

router.post('/consult', consultController.consult);

module.exports = router;
