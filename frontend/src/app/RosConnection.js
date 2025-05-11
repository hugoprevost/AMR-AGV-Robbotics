import React, { useEffect } from "react";
import ROSLIB from "roslib";

const RosConnection = () => {

  useEffect(() => {
    console.log("🛠️ useEffect exécuté !");

    const ros = new ROSLIB.Ros({
      url: "ws://robotwebtools.org:9090", // Serveur ROSBridge public
    });

    ros.on("connection", () => {
      console.log("✅ Connecté à ROSBridge !");
    });

    ros.on("error", (error) => {
      console.error("❌ Erreur de connexion :", error);
    });

    ros.on("close", () => {
      console.log("🔌 Connexion fermée");
    });

    // Ajout d'une gestion des erreurs au niveau de la connexion initiale
    ros.on("error", (error) => {
      console.error("❌ Problème de connexion avec WebSocket:", error);
    });

    return () => {
      console.log("🛑 Nettoyage du useEffect !");
      ros.close();
    };
  }, []); 

  return null; 
};

export default RosConnection;
