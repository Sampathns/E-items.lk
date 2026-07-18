const express = require('express');
const router = express.Router();

const { 
  registerUser, 
  authUser, 
  getUserProfile, 
  getUsers 
} = require('../controllers/userController');

router.post ('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', getUserProfile);
router.get('/', getUsers);

module.exports = router;
