const TeleopData = require('../models/Teleop')
const roslib = require('roslib');
const ros = require('./rosConnection'); 

exports.teleopMoving = async (req, res, next) => { 
    console.log("Données reçues du frontend :", req.body);
    try {
        const { x, y } = req.body;
        if (x === undefined || y === undefined) {
            return res.status(400).json({ message: 'Données invalides reçues' });
        }
        const result = await TeleopData.findOneAndUpdate(
            {}, 
            { $set: { telopDataMove: { x, y } } }, 
            { upsert: true, new: true, projection: { _id: 0 } }
        );
        console.log("Données mises à jour :", result);
        const moveMessage = new roslib.Message({
            linear: { x: y, y: 0, z: 0 },  // x : avance/recul (mouvement linéaire)
            angular: { x: 0, y: 0, z: x }  // y : rotation (autour de l'axe z)
        });
        const cmdVelTopic = new roslib.Topic({
            ros: ros,
            name: '/cmd_vel_tab',
            messageType: 'geometry_msgs/Twist'
        });
        cmdVelTopic.publish(moveMessage);
        console.log("Commande envoyée à ROS via roslib :", moveMessage);
        res.status(200).json({ message: 'Données mises à jour et envoyées à ROS', result });
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.modifyTeleopCountUpper = async (req, res, next) => {
    try {
        console.log("Données reçues du frontend :", req.body);
        const { value, hMin, hMax, gap } = req.body;
        if (value === undefined) {
            return res.status(400).json({ message: "Donnée 'value' manquante" });
        }
        console.log("Données reçues du frontend :", req.body);
        const result = await TeleopData.findOneAndUpdate(
            {}, 
            { $set: { telopDataLift: { value, hMin, hMax, gap } } }, 
            { upsert: true, new: true }
        ); 
        const liftMessage = new roslib.Message({
            data: [value, hMin, hMax, gap]
        });
        const cmdLiftTopic = new roslib.Topic({
            ros: ros,
            name: '/cmd_lift',
            messageType: 'std_msgs/Float32MultiArray' 
        });
        cmdLiftTopic.publish(liftMessage);
        console.log("Commande d'élévation envoyée à ROS via roslib :", liftMessage);
        res.json({ success: true, result });
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.teleopCountUpper = async (req, res, next) => {
    try {
        const countData = await TeleopData.findOne();
        if (!countData || !countData.telopDataLift) {
            return res.status(404).json({ message: "Données non trouvées" });
        }
        const { value, hMin, hMax, gap } = countData.telopDataLift;
        res.json({ value, hMin, hMax, gap });
    } catch (error) {
        console.error(" Erreur serveur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};