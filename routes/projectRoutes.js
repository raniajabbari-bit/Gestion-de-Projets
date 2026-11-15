
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    createProject,
    getProjects,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

// Ajouter un projet
router.post('/', authMiddleware, createProject);

// Afficher les projets
router.get('/', authMiddleware, getProjects);

// Modifier un projet
router.put('/:id', authMiddleware, updateProject);

// Supprimer un projet
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
