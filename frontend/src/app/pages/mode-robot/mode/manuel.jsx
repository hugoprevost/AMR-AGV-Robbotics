import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './manuel.scss';
import Map from '../../../components/map/map'
import ButtonBack from '../../../components/button-back/button-back'
 
  
const Manuel = () => { 

    const { t } = useTranslation();
    
    return (
        <>
            <div className='manuel-content'>
                <div className='back-button'>
                    <NavLink to="/mode_robot">
                        <ButtonBack/>
                    </NavLink>
                </div>
                <div className='content-manuel'>
                    <div className='content-manuel-map'>
                        <Map/>
                    </div>
                    <div className='content-manuel-text-block'>
                        <div className='content-manuel-text-block-tittle'>
                            {t('Les roues ne sont plus bloquées')}
                        </div>
                        <div className='content-manuel-text-block-p'>
                           {t('Mode non accessible :')}
                           <ul>
                                <li>{t('Follow-me')}</li>
                                <li>{t('Automatique')}</li>
                           </ul>
                        </div>
                        <div className='content-manuel-text-block-button'>
                            {t('Bloquer les roues')}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default Manuel;