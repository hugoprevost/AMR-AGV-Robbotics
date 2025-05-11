import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './home.scss';
import Map from '../../components/map/map'
  
const Home = () => {

    const { t } = useTranslation();

    const [lastMissions, setLastMissions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/")
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data)) {
              setLastMissions(data);
            } else {
              console.error("Données inattendues reçues :", data);
            }
          })
          .catch(error => console.error("Erreur lors du chargement des dernières missions :", error));
      }, []);
    
    return (
        <>
            <div className='home-content'>
                <div className='content-home'>
                    <div className='content-home-map'>
                        <Map/>
                    </div>
                    <div className='content-home-text-block'>
                        <div className='content-home-text-block-tittle'>
                            {t('Dernières missions réalisées :')}
                            {lastMissions.length === 0 ? (
                                <p>Aucune mission récente</p>
                            ) : (
                                <ul>
                                {lastMissions.map(mission => (
                                    <li key={mission._id}>{mission.nom}</li>
                                ))}
                                </ul>
                            )}
                        </div>
                        <div className='content-home-text-block-tittle'>
                            {t('Information sur le robot :')}
                            <ul>
                                <li>{t('Dernière recharge le 00/00 à 16h00')}</li>
                                <li>{t('Mise à jour du 00/00')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default Home;