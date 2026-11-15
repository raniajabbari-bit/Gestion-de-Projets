
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');

// نقراو المتغيرات الموجودة في fichier .env
dotenv.config();


const app = express();
app.use(cors());
// Middleware باش نقراو JSON
app.use(express.json());

// نربطو routes متاع authentification
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// نربطو routes متاع projet
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

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
