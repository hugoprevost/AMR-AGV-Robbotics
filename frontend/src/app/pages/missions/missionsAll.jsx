import React, { useState, useEffect } from 'react';
import './missions.scss';
import Drop from '../../components/mission-drop/mission-drop';
import NavFiltre from '../../components/navFiltre/navFiltre'
import axios from "axios"

const MissionsAll = () => {
    const [missions, setMissions] = useState([]);
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        // Effectue une requête GET pour récupérer les missions favorites
        axios.get("http://localhost:5001/missions")  // Remplace par l'URL de ton serveur
            .then(response => {
                // Met à jour l'état avec les missions favorites
                setMissions(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des missions favorites :", error);
            });
    }, []);

    return (
        <>
            <div className='content-container-mission'>    
                <NavFiltre/>
                <div className='block-mission-nom'>
                    <div className='block-mission-nom-all'>
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
                    </div>
                    <div className='scroller'> 
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default MissionsAll;