const Robot = require('../models/Robot');

exports.changeNameRobot = async (req, res, next) => {
  try {
    const { nom } = req.body;
    if (!nom) {
      return res.status(400).json({ message: "Le champ 'nom' est requis" });
    }
    const robot = await Robot.findOne();
    if (!robot) {
      return res.status(404).json({ message: "Aucun robot trouvé" });
    }
    robot.nom = nom; // Met à jour le nom
    await robot.save(); // Sauvegarde dans la base de données
    res.status(200).json({ message: "Nom mis à jour avec succès", robot });
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
}

exports.recuperationNameRbot = async (req, res, next) => {
  try {
    const robot = await Robot.findOne();
    if (!robot) {
      return res.status(404).json({ message: "Aucun robot trouvé" });
    }
    res.status(200).json({ nom: robot.nom });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
}

exports.getLangueRobot = async (req, res, next) => {
  try {
    const robot = await Robot.findOne(); // Récupérer le seul robot existant
    if (!robot) {
        return res.status(404).json({ message: "Aucun robot trouvé" });
    }
    res.json({ langue: robot.langue });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
}
}

exports.updateLangueRobot = async (req, res, next) => {
  try {
    const { langue } = req.body; // Récupère la langue envoyée depuis le frontend
    const robot = await Robot.findOne(); // Récupérer le seul robot existant
    if (!robot) {
      return res.status(404).json({ message: "Aucun robot trouvé" });
    }
    robot.langue = langue; // Mettre à jour la langue
    await robot.save(); // Sauvegarder la modification
    res.json({ message: "Langue mise à jour avec succès", langue: robot.langue });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.updateModeConduite = async (req, res, next) => {
  try {
    const { modeConduite } = req.body;
    const updatedRobot = await Robot.findOneAndUpdate({}, { modeConduite }, { new: true });
    if (!updatedRobot) {
      return res.status(404).json({ message: "Robot non trouvé" });
    }
    res.status(200).json({ message: "Mode de conduite mis à jour", robot: updatedRobot });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.getBatteryLevel = async (req, res, next) => {
  try {
    const robot = await Robot.findOne(); // Récupère le premier robot trouvé
    if (!robot) {
      return res.status(404).json({ message: "Robot non trouvé" });
    }
    res.status(200).json({ batteryLevel: robot.batteryLevel });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
}

exports.getStateRobot = async (req, res, next) => {
  try {
    const robot = await Robot.findOne();
    if (!robot) {
      return res.status(404).json({ message: "Robot non trouvé" });
    }
    res.status(200).json({ state: robot.state });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
}

exports.getLockRobot = async (req, res, next) => {
  try {
    const robot = await Robot.findOne();
    if (!robot) {
      return res.status(404).json({ message: "Robot non trouvé" });
    }
    res.status(200).json({ password: robot.password });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
}

exports.getModelRobot = async (req, res, next) => {
  try {
    const robot = await Robot.findOne();
    if (!robot) {
      return res.status(404).json({ message: "Robot non trouvé" });
    }
    res.status(200).json({ modelRobot: robot.modelRobot });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
}

const ADMIN_PIN = "0000";

exports.verifyRobotPin = async (req, res) => {
  try {
    const { pin } = req.body; // Récupère le PIN saisi

    // Vérifie que le PIN est valide
    if (!pin || !/^\d{4}$/.test(pin)) {
        return res.status(400).json({ message: "Le code PIN doit être un nombre à 4 chiffres." });
    }

    if (pin === ADMIN_PIN) {
        return res.status(200).json({ message: "Code PIN correct !" });
    }

    // Récupère le robot
    const robot = await Robot.findOne();
    if (!robot) {
        return res.status(404).json({ message: "Robot non trouvé." });
    }

    // Compare le PIN saisi avec celui stocké en texte clair
    if (robot.pin === pin) {
        return res.status(200).json({ message: "Code PIN correct !" });
    } else {
        return res.status(400).json({ message: "Code PIN incorrect." });
    }

} catch (error) {
    console.error("Erreur dans verifyRobotPin:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
}
};

exports.changePin = async (req, res) => {
  const { ancienPin, nouveauPin } = req.body;

  try {
    // Trouver le robot dans la base de données
    const robot = await Robot.findOne();

    if (!robot) {
      return res.status(404).json({ message: "Robot non trouvé" });
    }

    // Vérifier si l'ancien PIN est correct
    if (robot.pin !== ancienPin) {
      return res.status(400).json({ message: "Ancien code PIN incorrect" });
    }

    // Mettre à jour le code PIN avec le nouveau
    robot.pin = nouveauPin;

    // Sauvegarder le robot avec le nouveau PIN
    await robot.save();

    res.status(200).json({ message: "Code PIN changé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du PIN:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};