import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './options-lock.scss';
import ButtonBack from '../../components/button-back/button-back'
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [initialized, setInitialized] = useState(false); // Gérer l'état d'initialisation

  useEffect(() => {
    if (i18n.isInitialized) {
      setInitialized(true); // `i18n` est initialisé
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    if (initialized) {
      i18n.changeLanguage(lng); // Changer la langue
    }
  };

  const updateRobotLanguage = async (lng) => {
    try {
      await fetch('http://localhost:5001/options/lock/langue', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ langue: lng }), // Envoie la langue sélectionnée
      });
      if (initialized) {
        i18n.changeLanguage(lng); // Met à jour la langue côté frontend
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la langue:', error);
    }
  };
  
  return (
    <>
      <div className='content-container-options-lock'>    
        <div className='block-options-lock'> 
          <div className='back-button'>
            <NavLink to="/options/lock">
              <ButtonBack/>
            </NavLink>
          </div>
          <div className='block-options-lock-titre'>
            {t('Choix de la langue')}
          </div>
        </div>
        <div className='block-options-lock-all'>      
        <div className='block-options-lock-all-bas'>
            <button onClick={() => {
                changeLanguage('en');
                updateRobotLanguage('en');
              }} className='block-options-lock-all-bas-1'>
              {t('Anglais')}
            </button>
            <button onClick={() => {
                changeLanguage('de');
                updateRobotLanguage('de');
              }} className='block-options-lock-all-bas-1'>
              {t('Allemand')}
            </button>
            {/* <button onClick={() => changeLanguage('it')} className='block-options-lock-all-bas-2'>
              {t('Italien')}
            </button> */}
          </div>  
          <div className='block-options-lock-all-haut'>
            <button onClick={() => {
                changeLanguage('fr');
                updateRobotLanguage('fr');
              }} className='block-options-lock-all-haut-1'>
              {t('Français')}
            </button>
            <button onClick={() => {
                changeLanguage('es');
                updateRobotLanguage('es');
              }} className='block-options-lock-all-haut-1'>
              {t('Espagnol')}
            </button>
            <button onClick={() => {
                changeLanguage('pt');
                updateRobotLanguage('pt');
              }} className='block-options-lock-all-haut-1'>
              {t('Portugais')}
            </button>
            <button onClick={() => {
                changeLanguage('pl');
                updateRobotLanguage('pl');
              }} className='block-options-lock-all-haut-1'>
              {t('Polonais')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
  
export default LanguageSwitcher ;