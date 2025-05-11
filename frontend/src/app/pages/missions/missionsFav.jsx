import React from 'react';
import './missions.scss';
import NavFiltre from '../../components/navFiltre/navFiltre'
import MissionFavori from '../../components/mission-favori/missionFavori'

const MissionsFav = () => {

    

    return (
        <>
            <div className='content-container-mission'>    
                <NavFiltre/>
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
  
export default MissionsFav;