
const Task = require('../models/Task');
const Project = require('../models/Project');

// Vérifier si l'utilisateur peut accéder au projet
const checkProjectAccess = async (projectId, user) => {

    const project = await Project.findById(projectId);

    if (!project) {
        return null;
    }

    // Manager 3endo accés lil projet lkol
    if (user.role === 'manager') {
        return project;
    }

    // User 3endo accès lil projet mte3o uniquement 
    if (project.createdBy.toString() === user.id) {
        return project;
    }

    return null;
};


// 1. Créer une tâche
const createTask = async (req, res) => {
    try {
        const {
            titre,
            description,
            statut,
            priorite,
            dateEcheance,
            project
        } = req.body;
         // nthabto ili les champs obligatoire m3amrin
        if (!titre || !description || !dateEcheance || !project) {
            return res.status(400).json({
                message: "Tous les champs obligatoires doivent être remplis"
            });
        }
       // nthabto projet mawjod wil user endo l7a9 yod5el
        const projectExists = await checkProjectAccess(
            project,
            req.user
        );

        if (!projectExists) {
            return res.status(404).json({
                message: "Projet introuvable ou accès interdit"
            });
        }
       // task create f DB
        const task = await Task.create({
            titre,
            description,
            statut,
            priorite,
            dateEcheance,
            project,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Tâche créée avec succès",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


// 2. Afficher les tâches
const getTasks = async (req, res) => {
    try {
        let projects;
        // ken manger njibo les projet lkol
        if (req.user.role === 'manager') {
            projects = await Project.find();
        } else {
            // ken user njibo ken les projet mte3o
            projects = await Project.find({
                createdBy: req.user.id
            });
        }
       // njibo id lte3 projet
        const projectIds = projects.map(p => p._id);
       // njibo tasks lmarbouta bil projet ili ynajm user ychofhm
        const tasks = await Task.find({
            project: { $in: projectIds }
        })
        .populate('project', 'titre')
        .populate('createdBy', 'nom login');

        res.status(200).json({
            tasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


// 3. Modifier une tâche
const updateTask = async (req, res) => {
    try {
        //nlawjo 3la task bil id mte3ha
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Tâche introuvable"
            });
        }

        const projectExists = await checkProjectAccess(
            task.project,
            req.user
        );

        if (!projectExists) {
            return res.status(403).json({
                message: "Accès interdit à cette tâche"
            });
        }
        //ne5dho les donnée jdod ili b3athhem user
        const updatedData = { ...req.body };

        // nemn3o modification des relations
        delete updatedData.project;
        delete updatedData.createdBy;
       // ntab9o les modification
        Object.assign(task, updatedData);

        await task.save();

        res.status(200).json({
            message: "Tâche modifiée avec succès",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


// 4. Supprimer une tâche
const deleteTask = async (req, res) => {
    try {
        //recherche task bil id
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Tâche introuvable"
            });
        }

        const projectExists = await checkProjectAccess(
            task.project,
            req.user
        );

        if (!projectExists) {
            return res.status(403).json({
                message: "Accès interdit à cette tâche"
            });
        }

        await Task.findByIdAndDelete(task._id);

        res.status(200).json({
            message: "Tâche supprimée avec succès"
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};
