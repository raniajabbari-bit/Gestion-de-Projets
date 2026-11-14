
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// نقراو المتغيرات الموجودة في fichier .env
dotenv.config();

const app = express();

// Middleware باش نقراو JSON
app.use(express.json());

// Connexion MongoDB
connectDB();

// Route principale
app.get('/', (req, res) => {
    res.json({
        message: "API Gestion des projets et des tâches"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
