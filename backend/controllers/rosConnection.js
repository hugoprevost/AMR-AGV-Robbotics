/* const roslib = require('roslib');

// Créer la connexion ROS (WebSocket)
const ros = new roslib.Ros({
    url: 'ws://localhost:9090'  // Assure-toi que rosbridge est bien démarré à ce port
});

// Gérer les événements de connexion et d'erreur
ros.on('connection', function() {
    console.log('Connexion ROS établie via WebSocket');
});

ros.on('error', function(error) {
    console.log('Erreur ROS : ', error);
});

ros.on('close', function() {
    console.log('La connexion ROS a été fermée');
});

// Exporter l'objet `ros` pour qu'il soit utilisé ailleurs dans le projet
module.exports = ros; */