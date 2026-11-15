const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
    try {
        // Récupérer le token dans le header Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Accès refusé. Token manquant."
            });
        }

        // Extraire le token
        const token = authHeader.split(' ')[1];

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Stocker les informations utilisateur
        req.user = decoded;

        // Passer à la route suivante
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token invalide ou expiré"
        });
    }
};

module.exports = authMiddleware;