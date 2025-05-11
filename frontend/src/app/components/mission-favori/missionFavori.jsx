import React, { useState, useEffect }  from 'react';
import '../../pages/missions/missions.scss';
import Drop from '../../components/mission-drop/mission-drop';
import axios from "axios";

function MissionFavori(){ 
    const [missions, setMissions] = useState([]);
    const [openId, setOpenId] = useState(null); // 🔹 Gère quelle Drop est ouverte

    useEffect(() => {
        axios.get("http://localhost:5001/missions")  
            .then(response => {
                const missionsFavorites = response.data.filter(mission => mission.favori === true);
                setMissions(missionsFavorites);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des missions favorites :", error);
            });
    }, []);
        
    return (
        <> 
            <div>
                {missions.map(mission => (
                    <div key={mission._id} className="drop-mission">
                        <Drop 
                            id={mission._id} 
                            accroche={mission.accroche} 
                            nom={mission.nom} 
                            description={mission.description} 
                            favori={mission.favori} 
                            openId={openId} // 🔹 Passe l'ID actuellement ouvert
                            setOpenId={setOpenId} // 🔹 Fonction pour changer l'état
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default MissionFavori;