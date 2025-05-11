const mongoose = require('mongoose')

const missionSchema = mongoose.Schema({
    _id: {type: String, required: true},
    nom: {type: String, required: true},
    favori: {type: Boolean, required: true},
    accroche: {type: String, required: true},
    description: {type: String, required: true},
    lastOpenedAt: { type: Date, default: null },
    status: { type: String, default: "pending" }
});

module.exports = mongoose.model('Mission', missionSchema);