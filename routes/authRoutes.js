
const express = require('express');
const router = express.Router();

const {
    register,
    login
} = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Route d'inscription
router.post('/register', register);
// Route de Connexion
router.post('/login', login);


// Route protégée
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Accès autorisé",
        user: req.user
    });
});


// Route accessible uniquement aux managers
router.get(
    '/manager',
    authMiddleware,
    roleMiddleware('manager'),
    (req, res) => {
        res.status(200).json({
            message: "Bienvenue Manager",
            user: req.user
        });
    }
);

module.exports = router;
