const express = require('express');
const userController = require('../controllers/userController');
const { verifyJWT } = require('../middlewares/authMiddleware');
const consultController = require('../controllers/consultController');
const profileController = require('../controllers/profileController'); 

const router = express.Router();

router.post('/register', profileController.makeProfile, userController.register);
router.post('/login', userController.login);

router.get('/', verifyJWT, userController.getUserDetails);
router.put('/update', verifyJWT, userController.updateUserDetails);
router.delete('/delete', verifyJWT, userController.deleteUser);
router.get('/protected', verifyJWT, userController.protected);

router.get('/profile',verifyJWT, profileController.getProfile);
router.put('/profile',verifyJWT, profileController.updateProfile);
router.get('/profile/medical-history', verifyJWT, profileController.getMedicalHistory); 
router.post('/profile/medical-history', verifyJWT, profileController.addMedicalHistory); 
router.put('/profile/medical-history', verifyJWT, profileController.updateMedicalHistory);
router.delete('/profile/medical-history', verifyJWT, profileController.deleteMedicalHistory); 

router.post('/consult', consultController.consult);

module.exports = router;
