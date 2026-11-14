
const express = require('express');
const router = express.Router();

const { register } = require('../controllers/authController');

// Route d'inscription
router.post('/register', register);

module.exports = router;
