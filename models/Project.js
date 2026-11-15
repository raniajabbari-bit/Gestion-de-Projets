const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    titre: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    dateDebut: {
        type: Date,
        required: true
    },

    dateFin: {
        type: Date,
        required: true
    },

    statut: {
        type: String,
        enum: ['en_attente', 'en_cours', 'termine'],
        default: 'en_attente'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);