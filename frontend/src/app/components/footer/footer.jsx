import React, { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import homeIcon from '../../assets/img/menu/home.svg';
import missionsIcon from '../../assets/img/menu/missions.svg';
import modeIcon from '../../assets/img/menu/mode.svg';
import optionsIcon from '../../assets/img/menu/options.svg';
import gestionIcon from '../../assets/img/menu/gestion.svg';

import homeIconWhite from '../../assets/img/menu/home-white.svg';
import missionsIconWhite from '../../assets/img/menu/missions-white.svg';
import modeIconWhite from '../../assets/img/menu/mode-white.svg';
import optionsIconWhite from '../../assets/img/menu/options-white.svg';
import gestionIconWhite from '../../assets/img/menu/gestion-white.svg';

import './footer.scss';
  
const Footer = () => {

    const { t } = useTranslation();

    const menuHomeBtn = `${t('Accueil')}`;
    const menuMissionsBtn = `${t('Missions')}`;
    const menuModeBtn = `${t('Mode Robot')}`;
    const menuOptionsBtn = `${t('Options')}`;
    const menuGestionBtn = `${t('Gestion')}`;

    

// TODO : Skin 4 routing & active page
//        Notification dot system (it changes color) maybe after first draft API tho

    return (
        <footer>
            <NavLink className={({isActive}) => {return isActive ? " menu-btn-items-container-active" : "menu-btn-items-container"}} to="/">
                <div className='menu-btn ft-menu'>
                    <div className='menu-btn-items-container'>
                        <img src={ homeIcon } alt='Home button icon' className='blue'/>
                        <img src={ homeIconWhite } alt='Home button icon white' className='white'/>
                        { menuHomeBtn }
                    </div>
                </div>
            </NavLink>

            <NavLink className={({isActive}) => {return isActive ? " menu-btn-items-container-active" : "menu-btn-items-container"}} to="/missions" >
                <div className='menu-btn ft-menu'> 
                    <div className='menu-btn-items-container'>
                        <img src={ missionsIcon } alt='Missions button icon' className='blue'/>
                        <img src={ missionsIconWhite } alt='Missions button icon white' className='white'/>
                        { menuMissionsBtn }
                    </div>
                </div>
            </NavLink>

            <NavLink className={({isActive}) => {return isActive ? " menu-btn-items-container-active" : "menu-btn-items-container"}} to="/mode_robot">
                <div className='menu-btn ft-menu'>
                    <div className='menu-btn-items-container' >
                        <img src={ modeIcon } alt='Mode button icon' className='blue'/>
                        <img src={ modeIconWhite } alt='Mode button icon white' className='white'/>
                        { menuModeBtn }
                    </div>
                </div>
            </NavLink>

            <NavLink className={({isActive}) => {return isActive ? " menu-btn-items-container-active" : "menu-btn-items-container"}} to="/options">
                <div className='menu-btn ft-menu'>
                    <div className='menu-btn-items-container'>
                        <img src={ optionsIcon } alt='Options button icon' className='blue'/>
                        <img src={ optionsIconWhite } alt='Options button icon white' className='white'/>
                        { menuOptionsBtn }
                    </div>
                </div>
            </NavLink>

            <NavLink className={({isActive}) => {return isActive ? " menu-btn-items-container-active" : "menu-btn-items-container"}} to="/gestion">
                <div className='menu-btn ft-menu'>
                    <div className='menu-btn-items-container'>
                        <img src={ gestionIcon } alt='Gestion button icon' className='blue'/>
                        <img src={ gestionIconWhite } alt='Gestion button icon white' className='white'/>
                        { menuGestionBtn }
                    </div>
                </div>
            </NavLink>
        </footer>
    )
}
  
export default Footer;