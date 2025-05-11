import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './options-lock-affichage.scss';
import ButtonBack from '../../components/button-back/button-back';
import { useTranslation } from 'react-i18next';

const ChangementPinRobot = () => {
  const { t } = useTranslation();

  const [ancienPin, setAncienPin] = useState('');
  const [nouveauPin, setNouveauPin] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePin = async () => {
    try {
      const response = await axios.put('http://localhost:5001/lock/pin', { ancienPin, nouveauPin });

      if (response.status === 200) {
        setMessage(`Code PIN changé avec succès.`);
        window.location.reload();
      }
    } catch (error) {
      setMessage("Erreur lors de la mise à jour du code PIN.");
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
          {t('Changer le code')}
        </div>
        <div className='form-nom-robot'>
          <div className="form-container">
            <input 
                type="password" 
                placeholder={t('Entrez votre ancien code')}
                value={ancienPin} 
                onChange={(e) => setAncienPin(e.target.value)} 
                className="form-nom-robot-input"
            />

            <input 
                type="password" 
                placeholder={t('Entrez le nouveau code')}
                value={nouveauPin} 
                onChange={(e) => setNouveauPin(e.target.value)} 
                className="form-nom-robot-input"
            />
          </div>
          <button onClick={handleChangePin} className='form-nom-robot-button'>
            {t('Changer le code')}
          </button>
          
          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default ChangementPinRobot;
