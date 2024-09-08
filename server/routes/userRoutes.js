const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// User profile routes
router.get('/profile', auth,  userController.getUserProfile);
router.put('/profile', auth, userController.updateUserProfile);

// Profile management routes
router.post('/profiles', profileController.createProfile);
router.get('/profiles', profileController.getProfiles);
router.put('/profiles/:id', profileController.updateProfile);
router.delete('/profiles/:id', profileController.deleteProfile);

module.exports = router;