// Route for User login and register.
const express = require('express');
const router = express.Router();

const { 
  registerUser,
  loginUser,
  deleteUser
} = require('../controllers/userController')

// POST request to register new user.
router.post('/register', registerUser);

// POST request to log user in.
router.post('/login', loginUser);

// DELETE request to delete user account.
router.delete('/delete', deleteUser);

module.exports = router;

// Middleware for authenticating users in each request.
exports.verifyToken = (req, res, next) => {
const token = req.headers.authorization;
  if (token) {
    Jwt.verify(token, process.env.SECRET, (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
    }) 
  } else {
    return res.sendStatus(401);
  }
};

