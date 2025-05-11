const express = require('express');
const routerTeleop = express.Router();

const teleopCtrl = require('../controllers/teleop');

routerTeleop.post('/teleop-move', teleopCtrl.teleopMoving)
routerTeleop.post('/teleop-upper', teleopCtrl.modifyTeleopCountUpper)
routerTeleop.get('/teleop-upper', teleopCtrl.teleopCountUpper)

module.exports = routerTeleop;