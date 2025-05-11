const mongoose = require('mongoose')

const teleopDataSchema = mongoose.Schema({
    telopDataMove: {
        x: {type: String, required: true},
        y: {type: String, required: true},
    },
    telopDataLift: {
        hMin: {type: Number, required: true},
        hMax: {type: Number, required: true},
        value: {type: Number, required: true},
        gap: {type: Number, required: true},
    },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TeleopData', teleopDataSchema);