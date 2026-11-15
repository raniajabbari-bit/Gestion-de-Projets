Travail assurée par Jabberi Rania

Ce projet consiste à développer une API REST de gestion de projets et de tâches.
L'application permet aux utilisateurs de gérer leurs projets et leurs tâches selon leurs rôles et leurs autorisations.
Configurer les variables d'environnement
Créer un fichier .env à la racine du projet :
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/gestion_projets
JWT_SECRET=ma_cle_secrete123456789
JWT_EXPIRES_IN=1d

Technologies utilisées:
Node.js
Express.js
MongoDB
Mongoose
JWT (authentification)
bcryptjs (hachage des mots de passe)
Postman (tests de l'API)

les routes:
authentification:post ----> /api/auth/register--->inscription
                  post ---->/api/auth/login----> connexion 
                 get ----->/api/auth/... ------>Route protégée de test (si configurée)
projet: POST---->/api/projects---->Créer un projet
        GET---->/api/projects---->Récupérer les projets autorisés
        GET---->/api/projects/---->Consulter un projet
        PUT---->/api/projects/id--->Modifier un projet
        DELETE---->/api/projects/id--->Supprimer un projet
taches: POST--->/api/task--->Créer une tâche
        GET--->/api/tasks--->Récupérer les tâches autorisées
        GET--->/api/tasks/---->Consulter une tâche
        PUT--->/api/tasks/id---->Modifier une tâche
        DELETE--->/api/tasks/id--->Supprimer une tâche

Authentification des routes protégées:
   Pour accéder aux routes protégées, il faut ajouter le token JWT dans les headers HTTP :
   Authorization: Bearer VOTRE_TOKEN