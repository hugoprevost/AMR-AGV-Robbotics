const express = require('express');
const missionRouter = express.Router();

const missionCtrl = require('../controllers/mission');

missionRouter.get('/:id', missionCtrl.getOneMission);

missionRouter.put('/:id', missionCtrl.getOneMissionOpen);

missionRouter.get('/', missionCtrl.getAllMission);

missionRouter.patch('/:id', missionCtrl.patchFavMission);

missionRouter.put('/:id/open', missionCtrl.updateLastOpenedAt);

module.exports = missionRouter;