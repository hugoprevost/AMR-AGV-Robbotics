import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './follow-me.scss';
import Map from '../../../components/map/map'
import ButtonBack from '../../../components/button-back/button-back'

const FollowMe = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className='followme-content'>
                <div className='back-button'>
                    <NavLink to="/mode_robot">
                        <ButtonBack/>
                    </NavLink>
                </div>
                <div className='content-followme'>
                    <div className='content-followme-map'>
                        <Map/>
                    </div>
                    <div className='content-followme-text-block'>
                        <div className='content-followme-text-block-tittle'>
                            {t('Follow-Me en attente')}
                        </div>
                        <div className='content-followme-text-block-p'>
                            {t('Pressez le bouton vert pour démarer')}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default FollowMe;