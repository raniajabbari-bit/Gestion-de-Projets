
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    titre: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    statut: {
        type: String,
        enum: ['todo', 'doing', 'done'],
        default: 'todo'
    },

    priorite: {
        type: String,
        enum: ['basse', 'moyenne', 'haute'],
        default: 'moyenne'
    },

    dateEcheance: {
        type: Date,
        required: true
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
