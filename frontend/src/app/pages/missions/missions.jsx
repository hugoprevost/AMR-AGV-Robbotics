import React from 'react';
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import search from '../../assets/img/mission/search.svg';
import './missions.scss';
import MissionFavori from '../../components/mission-favori/missionFavori'



const Missions = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className='content-container-mission'>    
                <div className='block-mission'> 
                    <div className='block-mission-title'>
                        {t('Mission à réalisée')}
                    </div>
                    <div className='block-mission-filtre'>
                        <div className='block-mission-filtre-favori'>
                            {t('Missions favorites')}
                        </div>
                        <NavLink className={({isActive}) => {return isActive ? "block-mission-filtre-favori" : "block-mission-filtre-all"}} to="/missions/all">
                            <div>
                                {t('Toutes les missions')}
                            </div>
                        </NavLink>
                        <NavLink className="search" to="/missions/search">
                            <div>
                                <img src={ search } alt='search button' className="search-img"/>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className='block-mission-nom'>
                    <div className='block-mission-nom-all'>
                        <MissionFavori/>
                    </div>
                    <div className='scroller'> 
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default Missions;