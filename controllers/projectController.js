
const Project = require('../models/Project');

// 1. Ajouter un projet
const createProject = async (req, res) => {
    try {
        const {
            titre,
            description,
            dateDebut,
            dateFin,
            statut
        } = req.body;
        // نتثبتو اللي  les champs obligatoire الكل معمّرين
        if (!titre || !description || !dateDebut || !dateFin) {
            return res.status(400).json({
                message: "Tous les champs obligatoires doivent être remplis"
            });
        }
        // نتثبتو اللي date fin موش قبل date début

        if (new Date(dateFin) < new Date(dateDebut)) {
            return res.status(400).json({
                message: "La date de fin doit être après la date de début"
            });
        }
       //نسجلو projet في BD
        const project = await Project.create({
            titre,
            description,
            dateDebut,
            dateFin,
            statut,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Projet créé avec succès",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


// 2. Afficher les projets
const getProjects = async (req, res) => {
    try {
        let projects;

        // كان  Manager، ينجم يشوف projets الكل
        if (req.user.role === 'manager') {
            projects = await Project.find()
                .populate('createdBy', 'nom login');
        } else {
            // User : ينجم كان projet متاعو 
            projects = await Project.find({
                createdBy: req.user.id
            }).populate('createdBy', 'nom login');
        }

        res.status(200).json({
            projects
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


// 3. Modifier un projet
const updateProject = async (req, res) => {
    try {
        let project;
         // Managerينجم ymodifi ay projet
        if (req.user.role === 'manager') {
            project = await Project.findById(req.params.id);
        } else {
            // user ymodifi ken projet mte3o
            project = await Project.findOne({
                _id: req.params.id,
                createdBy: req.user.id
            });
        }
        // nthabto ili projet mawjod wil user 3endo 7a9 bech ye3ml modification
        if (!project) {
            return res.status(404).json({
                message: "Projet introuvable ou accès interdit"
            });
        }
        // nekhdho les information ili b3athha user 
        const updatedData = { ...req.body };

         // نمنعو user من تغيير صاحب المشروع
        delete updatedData.createdBy;
        // كان date début ou fin ما تبدلش، نخليو التاريخ القديم

        const dateDebut = updatedData.dateDebut ?? project.dateDebut;
        const dateFin = updatedData.dateFin ?? project.dateFin;
       // نثبتو les dates
        if (new Date(dateFin) < new Date(dateDebut)) {
            return res.status(400).json({
                message: "La date de fin doit être après la date de début"
            });
        }
        // نطبقو les modification al projet
        Object.assign(project, updatedData);
        await project.save();

        res.status(200).json({
            message: "Projet modifié avec succès",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


// 4. Supprimer un projet
const deleteProject = async (req, res) => {
    try {
        let project;
        // manager ynajem yfasekh ay projet
        if (req.user.role === 'manager') {
            project = await Project.findById(req.params.id);
        } else { 
            // user yfasekh ken projet mte3o
            project = await Project.findOne({
                _id: req.params.id,
                createdBy: req.user.id
            });
        }
        // nthabto projet mawjod wil user 3endo l7a9 bech yfas5o
        if (!project) {
            return res.status(404).json({
                message: "Projet introuvable ou accès interdit"
            });
        }
       // nfas5o projet mil BD 
        await Project.findByIdAndDelete(project._id);

        res.status(200).json({
            message: "Projet supprimé avec succès"
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
};
