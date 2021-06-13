// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller')
const {
    authenticatedOnly: authenticatedOnlyMiddleware,
    guestOnly: guestOnlyMiddleware,
} = require('../middlewares/auth-middleware')

// =======================================
//              ROUTES
// =======================================
//user registration GET route
router.get('/register', guestOnlyMiddleware, userController.registerForm);

//user registration POST route
router.post('/register', guestOnlyMiddleware, userController.registerUser);

//user login GET route
router.get('/login', guestOnlyMiddleware, userController.loginForm);

//user login POST route
router.post('/login', guestOnlyMiddleware, userController.loginUser);

//dashboard GET route
router.get('/dashboard', authenticatedOnlyMiddleware, userController.dashboard);

//logout POST route
router.post('/logout', authenticatedOnlyMiddleware, userController.logout);

//export
module.exports = router