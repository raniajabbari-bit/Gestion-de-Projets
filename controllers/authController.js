
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Fonction d'inscription
const register = async (req, res) => {
    try {

        const { nom, login, password } = req.body;

        // نتثبتو اللي المعلومات الكل موجودة
        if (!nom || !login || !password) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires"
            });
        }

        // نتثبتو كان ال login موجود قبل
        const existingUser = await User.findOne({ login });

        if (existingUser) {
            return res.status(409).json({
                message: "Ce login existe déjà"
            });
        }

        // نعملو cryptage لل password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ننشؤو utilisateur جديد
        const user = await User.create({
            nom,
            login,
            password: hashedPassword,
            role: 'user'
        });

        // نرجعو النتيجة من غير password
        res.status(201).json({
            message: "Inscription réussie",
            user: {
                id: user._id,
                nom: user.nom,
                login: user.login,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

module.exports = { register };