import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './options-lock-affichage.scss';
import ButtonBack from '../../components/button-back/button-back';
import { useTranslation } from 'react-i18next';

const ChangementNomRobot = () => {
  const { t } = useTranslation();

  const [nouveauNom, setNouveauNom] = useState('');
  const [nomActuel, setNomActuel] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchNomRobot = async () => {
      try {
        const response = await axios.get('http://localhost:5001/options/lock/affichage');
        setNomActuel(response.data.nom.slice(0, 14));
      } catch (error) {
        console.error("Erreur lors de la récupération du nom", error);
      }
    };
    fetchNomRobot();
  }, []);

  const handleChangeNom = async () => {
    try {
      const response = await axios.put('http://localhost:5001/options/lock/affichage', { nom: nouveauNom });
      setMessage(`Nom changé en : ${response.data.robot.nom}`);
      window.location.reload();
    } catch (error) {
      setMessage("Erreur lors de la mise à jour");
      console.error(error);
    }
  };

  return (
    <div className='content-container-options-lock'>    
      <div className='block-options-lock-affichage'> 
        <div className='back-button'>
          <NavLink to="/options/lock">
            <ButtonBack />
          </NavLink>
        </div>
        <div className='block-options-lock-titre'>
          {t('Changer le nom du robot')}
        </div>
        <div className='form-nom-robot'>
          <input 
          type="text" 
          placeholder={nomActuel ? `${t('Nom actuel')} : ${nomActuel}` : t('Chargement...')}
          value={nouveauNom} 
          onChange={(e) => {
            const newValue = e.target.value.slice(0, 14)
            setNouveauNom(newValue)
          }}
          className='form-nom-robot-input'
        />
        <button onClick={handleChangeNom} className='form-nom-robot-button'>{t('Changer le nom du robot')}</button>
        </div>
      </div>
    </div>
  );
};

export default ChangementNomRobot;
