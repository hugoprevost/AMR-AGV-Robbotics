import React from 'react';
import './missions.scss';
import NavFiltre from '../../components/navFiltre/navFiltre'
import ModalSearch from '../../components/modalSearch/modalSearch'


const MissionsSearch = () => {


    return (
        <>
            <div className='content-container-mission'>    
                <NavFiltre/>
                <div className='block-mission-nom'>
                    <div className='block-mission-nom-all'>
                        <ModalSearch />
                    </div>
                    <div className='scroller'>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default MissionsSearch;