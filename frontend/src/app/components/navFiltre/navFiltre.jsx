// import { NavLink } from 'react-router-dom'
// import { useTranslation } from 'react-i18next';
// import search from '../../assets/img/mission/search.svg';
// import '../../pages/missions/missions.scss';

// function NavFiltre() {

//     const { t } = useTranslation();

//     return (
//         <div className='block-mission'> 
//             <div className='block-mission-title'>
//                 {t('Mission à réalisée')}
//             </div>
//             <div className='block-mission-filtre'>
//                 <NavLink className={({isActive}) => {return isActive ? "block-mission-filtre-favori" : "block-mission-filtre-all"}} to="/missions/favorite">
//                     <div>
//                         {t('Missions favorites')}
//                     </div>
//                 </NavLink>
//                 <NavLink className={({isActive}) => {return isActive ? "block-mission-filtre-favori" : "block-mission-filtre-all"}} to="/missions/all">
//                     <div>
//                         {t('Toutes les missions')}
//                     </div>
//                 </NavLink>
//                 <NavLink className="search" to="/missions/search">
//                 <div>
//                     <img src={ search } alt='search button'/>
//                 </div>
//                 </NavLink>
//             </div>
//         </div>
//     ) 
// }

// export default NavFiltre

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import search from '../../assets/img/mission/search.svg';
import '../../pages/missions/missions.scss';

function NavFiltre({ setModalOpen }) {  // Ajout de setModalOpen en prop
    const { t } = useTranslation();

    return (
        <div className='block-mission'> 
            <div className='block-mission-title'>
                {t('Mission à réaliser')}
            </div>
            <div className='block-mission-filtre'>
                <NavLink className={({isActive}) => isActive ? "block-mission-filtre-favori" : "block-mission-filtre-all"} to="/missions/favorite">
                    <div>{t('Missions favorites')}</div>
                </NavLink>
                <NavLink className={({isActive}) => isActive ? "block-mission-filtre-favori" : "block-mission-filtre-all"} to="/missions/all">
                    <div>{t('Toutes les missions')}</div>
                </NavLink>
                <NavLink className="search" to="/missions/search">
                    <div>
                         <img src={ search } alt='search button'/>
                    </div>
                </NavLink>
            </div>
        </div>
    ); 
}

export default NavFiltre;