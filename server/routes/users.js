// Route for User login and register.
const express = require('express');
const router = express.Router();

const { 
  registerUser,
  loginUser
} = require('../controllers/userController')

// POST request to register new user.
router.post('/register', registerUser);

// POST request to log user in.
router.post('/login', loginUser);

module.exports = router;

