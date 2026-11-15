
const express = require('express');
const router = express.Router();

const {
    register,
    login
} = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');

// Route d'inscription
router.post('/register', register);
// Route de Connexion
router.post('/login', login);


// Route protégée
router.get('/profile', authMiddleware, (req, res) => {
    res.json(200).json({
        message: "Accès autorisé",
        user: req.user
    });
});

module.exports = router;
