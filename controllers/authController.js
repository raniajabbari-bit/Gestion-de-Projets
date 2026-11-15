
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
       // Vérifier la longueur du mot de passe
        if (password.length < 8) {
             return res.status(400).json({
                message: "Le mot de passe doit contenir au moins 8 caractères"
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

        //   نعملو utilisateur جديد
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
// Fonction de connexion
const login = async (req, res) => {
    try {
        //ناخذو المعلومات اللي بعثهم utilisateur
        const { login, password } = req.body;

        // 2. نتثبتو اللي login و password موش فارغين
        if (!login || !password) {
            return res.status(400).json({
                message: "Login et mot de passe obligatoires"
            });
        }

        // 3.نلوجو على utilisateur fi BD MongoDB باستعمال login
        const user = await User.findOne({ login });

        if (!user) {
            return res.status(401).json({
                message: "Login ou mot de passe incorrect"
            });
        }

        // 4. Comparer le mot de passe saisi avec le mot de passe haché
        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Login ou mot de passe incorrect"
            });
        }

        // 5. Générer le token JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1d'
            }
        );

        // 6. Retourner le token et les informations utilisateur
        res.status(200).json({
            message: "Connexion réussie",
            token: token,
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

module.exports = { register, login };