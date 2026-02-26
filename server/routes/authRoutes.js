const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUser } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', authMiddleware, getUser);

module.exports = router;
