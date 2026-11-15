// Middleware de vérification des rôles
const roleMiddleware = (...roles) => {

    return (req, res, next) => {

        // Vérifier si l'utilisateur possède un rôle autorisé
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Accès interdit. Vous n'avez pas les permissions nécessaires."
            });
        }

        // Autoriser l'accès
        next();
    };
};

module.exports = roleMiddleware;