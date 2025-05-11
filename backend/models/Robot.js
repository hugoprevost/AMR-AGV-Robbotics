const mongoose = require('mongoose');

// const uniqueValidator = require('mongoose-unique-validator');

const robotSchema = mongoose.Schema({
    modelRobot: {type: String, required: true},
    nom: {type: String, required: true},
    modeConduite: {type: String, required: true},
    langue: { type: String, required: true },
    version: { type: String, required: true},
    dateRecharge: {type: Date, default: null },
    batteryLevel: {type: Number, required: true},
    state: {type: String, required: true},
    pin: {
        type: String, // Pas de hachage ici
        required: true,
        match: /^\d{4}$/, // Vérifie que c'est un code PIN à 4 chiffres
    }
});

module.exports = mongoose.model('RobotData', robotSchema);