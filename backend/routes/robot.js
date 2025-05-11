const express = require('express');
const routerRobot = express.Router();

const robotCtrl = require('../controllers/robot');

routerRobot.put('/options/lock/affichage', robotCtrl.changeNameRobot);

routerRobot.get('/options/lock/affichage', robotCtrl.recuperationNameRbot);

routerRobot.get('/options/lock/langue', robotCtrl.getLangueRobot);

routerRobot.put('/options/lock/langue', robotCtrl.updateLangueRobot);

routerRobot.post('/', robotCtrl.updateModeConduite);

routerRobot.get('/battery', robotCtrl.getBatteryLevel);

routerRobot.get('/state', robotCtrl.getStateRobot);

routerRobot.get('/lock', robotCtrl.getLockRobot);

routerRobot.get('/model', robotCtrl.getModelRobot);

routerRobot.post('/lock', robotCtrl.verifyRobotPin );

routerRobot.put('/lock/pin', robotCtrl.changePin );

module.exports = routerRobot;