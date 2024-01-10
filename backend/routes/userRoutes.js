const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/UserModel');

const {registerUser, loginUser} = require('../controller/userController');

router.post('/register', registerUser); // Register a new user

router.post('/login', loginUser); // Login user 

module.exports = router;
