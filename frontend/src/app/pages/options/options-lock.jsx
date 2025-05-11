import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './options-lock.scss';
import ButtonBack from '../../components/button-back/button-back'

const OptionsLock = () => {

  const { t } = useTranslation();

  return (
    <>
      <div className='content-container-options-lock'>    
        <div className='block-options-lock'> 
          <div className='back-button'>
            <NavLink to="/options">
              <ButtonBack/>
            </NavLink>
          </div>
          <div className='block-options-lock-titre'>
            {t('Paramètres du robot')}
          </div>         
        </div>
        <div className='block-options-lock-all'>        
          <div className='block-options-lock-all-haut'>
            <button className='block-options-lock-all-haut-1'>
              {t('Export Log')}
            </button>
            <NavLink to="/options/lock/affichage">
              <button className='block-options-lock-all-haut-1-texte'>
                {t('Affichage')}
              </button>
            </NavLink>
            <NavLink to="/options/lock/langue">
              <button className='block-options-lock-all-haut-1-texte'>
                {t('Langue')}
              </button>
            </NavLink>
            <NavLink to="/options/lock/password">
              <button className='block-options-lock-all-haut-1-texte'>
                {t('Mot de passe')}
              </button>
            </NavLink>
          </div>
          <div className='block-options-lock-all-bas'>
            <button className='block-options-lock-all-bas-1'>
              {t('Autocalibration')}
            </button>
            <button className='block-options-lock-all-bas-1'>
              ?
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
  
export default OptionsLock;