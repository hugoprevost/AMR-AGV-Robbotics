const express = require('express');
const routerlastmission = express.Router();

const missionCtrl = require('../controllers/mission');

routerlastmission.get('/', missionCtrl.getLastMissionOpen);

module.exports = routerlastmission;