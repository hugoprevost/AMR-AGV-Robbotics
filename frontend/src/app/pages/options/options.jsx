import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './options.scss';
import lock from '../../assets/img/lock.svg';

const Options = () => {
    
  const { t } = useTranslation();
        
  return (
  <>
    <div className='content-container-options'>    
      <div className='block-options'> 
        <div className='block-options-titre'>
          {t('Paramètres du robot')}
        </div>         
      </div>
      <div className='block-options-all'>        
        <div className='block-options-all-haut'>
          <div className='block-options-all-haut-1'>
            {t('Save Log')}
          </div>
          <div className='block-options-all-haut-1'>
            {t('Texte')}
          </div>
          <div className='block-options-all-haut-1'>
            {t('Texte')}
          </div>
          <div className='block-options-all-haut-1'>
            {t('Init')}
          </div>
        </div>
        <div className='block-options-all-bas'>
          <div className='block-options-all-bas-1'>
            {t('Informations')}
          </div>
          <div className='block-options-all-bas-1'>
            <NavLink to="/options/lock">
              <div  className='block-options-all-bas-1-texte'>
                {t('Options supplémentaires')}
                <img src={ lock } alt='locker icon' className='block-options-img-lock'/>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
  
export default Options;