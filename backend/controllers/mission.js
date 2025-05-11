const Mission = require('../models/Mission');

// exports.createMission = (req, res, next) =>{
//     delete req.body._id;
//     const mission = new Mission({
//         ...req.body
//     });
//     mission.save()
//         .then(() => res.status(201).json({message: 'mission enregistré'}))
//         .catch(error => res.status(400).json({ error }));
// };

// exports.modifyMission = (req, res, next) => {
//     Mission.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
//     .then(() => res.status(200).json({ message: 'Mission modifié'}))
//     .catch(error => res.status(400).json({ error }));
// };

// exports.deleteMission = (req, res, next) => {
//     Mission.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'mission supprimé'}))
//     .catch(error => res.status(400).json({ error }));
// };

exports.getOneMission = async (req, res, next) => {
    try {
      const mission = await Mission.findById(req.params.id);
      if (!mission) {
        return res.status(404).json({ message: "Mission non trouvée" });
      }
      res.json(mission);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };

exports.getOneMissionOpen = async (req, res, next) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Le statut est requis." });
      }
  
      // Crée une nouvelle date pour lastOpenedAt
      const currentDate = new Date();
  
      // Met à jour la mission avec la nouvelle valeur de statut et lastOpenedAt
      const updatedMission = await Mission.findByIdAndUpdate(
        req.params.id,
        { 
          status,
          lastOpenedAt: currentDate, // Ajout de la date d'ouverture
        },
        { new: true }
      );
  
      if (!updatedMission) {
        return res.status(404).json({ message: "Mission non trouvée" });
      }
  
      console.log("✅ Mission mise à jour :", updatedMission);
      res.json(updatedMission); // Retourne la mission mise à jour
    } catch (error) {
      console.error("❌ Erreur backend :", error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

exports.getAllMission = (req, res, next) =>{
    Mission.find()
    .then(missions => res.status(200).json(missions))
    .catch(error => res.status(400).json({ error }));
};

exports.patchFavMission = async (req, res, next) => {
    try {
        const { id } = req.params; // Récupération de l'ID de la mission
        const { favori } = req.body; // Récupération de la nouvelle valeur du favori

        // Vérifier si la mission existe
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ message: 'Mission non trouvée' });
        }

        // Mettre à jour la valeur "favori"
        mission.favori = favori;
        await mission.save(); // Sauvegarde dans la base de données

        res.status(200).json(mission); // Répondre avec la mission mise à jour
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la mission :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.getLastMissionOpen = async (req, res) => {
    try {
      const missions = await Mission.find({ lastOpenedAt: { $exists: true } })  
                                    .sort({ lastOpenedAt: -1 }) // Trier par date décroissante
                                    .limit(2); // Garder les 2 plus récentes
  
      if (missions.length === 0) {
        return res.status(404).json({ message: "Aucune mission trouvée" });
      }
  
      res.json(missions);
    } catch (error) {
      console.error("Erreur lors de la récupération des dernières missions ouvertes :", error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

  exports.updateLastOpenedAt = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedMission = await Mission.findByIdAndUpdate(
        id,
        { lastOpenedAt: new Date() }, // Mettre la date actuelle
        { new: true }
      );
  
      if (!updatedMission) {
        return res.status(404).json({ message: "Mission non trouvée" });
      }
  
      res.json(updatedMission);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de lastOpenedAt :", error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }