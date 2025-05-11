const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
/* const ROSLIB = require("roslib"); */
// const { envoyerCommande } = require("./controllers/rosController");

// 🔹 Importation des routes
const missionRoutes = require("./routes/mission");
const teleopRoutes = require("./routes/teleop");
const lastmissionRoutes = require("./routes/lastmission")
const robotRoutes = require("./routes/robot")

// 🔹 Connexion à MongoDB
mongoose
  .connect("mongodb+srv://hprevost:HWhSJcVDz7ynKPaE@cluster0.9eend.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Augmenter le délai à 30 secondes
  })
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch(() => console.log("❌ Connexion à MongoDB échouée"));

const app = express();
app.use(express.json());

// 🔹 Configuration du CORS
const corsOptions = {
  origin: "http://localhost:3000", // Accepter les requêtes depuis le front React
  methods: ["GET", "POST", "PATCH", "PUT"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

// 🔹 Middleware pour gérer les headers CORS (sécurité)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// 🔹 Connexion à ROSBridge (WebSocket)
/* const ros = new ROSLIB.Ros({
    url: "ws://0.0.0.0:9090", // Remplace par ton serveur ROSBridge si besoin
  });

ros.on("connection", () => {
  console.log("✅ Connecté à ROSBridge !");
});

ros.on("error", (error) => {
  console.error("❌ Erreur de connexion à ROSBridge :", error);
});

ros.on("close", () => {
  console.log("🔌 Connexion ROSBridge fermée");
}); */

// 🔹 Définition des routes
app.use("/missions", missionRoutes);
app.use("/", lastmissionRoutes);
app.use("/mode_robot", teleopRoutes);
app.use("/",robotRoutes)

app.post("/move", (req, res) => {
  const { linearX, angularZ } = req.body; // Récupérer les données du client

  if (typeof linearX === "number" && typeof angularZ === "number") {
      envoyerCommande(linearX, angularZ);
      res.json({ success: true, message: "Commande envoyée !" });
  } else {
      res.status(400).json({ success: false, message: "Données invalides" });
  }
});

// 🔹 Endpoint de test pour vérifier que ROS fonctionne
/* app.get("/ros_status", (req, res) => {
  if (ros.isConnected) {
    res.json({ status: "✅ Connecté à ROSBridge" });
  } else {
    res.status(500).json({ status: "❌ Non connecté à ROSBridge" });
  }
}); */

module.exports = app;