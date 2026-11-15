
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// Créer une tâche
router.post('/', authMiddleware, createTask);

// Afficher les tâches
router.get('/', authMiddleware, getTasks);

// Modifier une tâche
router.put('/:id', authMiddleware, updateTask);

// Supprimer une tâche
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
