import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './mode-robot.scss';
import automatique from '../../assets/img/mode/automatique.svg';
import followMe from '../../assets/img/mode/followMe.svg';
import teleop from '../../assets/img/mode/teleop.svg';
import manuel from '../../assets/img/mode/manuel.svg';
  
const Mode = () => {
    
    const { t } = useTranslation();

    return (
        <>
            <div className='content-block'>
                <div className='content-block-title'>
                    {t('Différents mode de navigation du robot')}
                </div>
                <div className='content-block-mode'>
                    <div className='content-block-mode-sous'>
                        <NavLink to="/">
                            <div className='content-block-mode-sous-button'>
                                <img src={ automatique } alt='automatique mode button'/>
                                {t('Mode Automatique')}
                            </div>
                        </NavLink>
                        <NavLink to="/mode_robot/follow-me">
                            <div className='content-block-mode-sous-button'>
                                <img src={ followMe } alt='follow-me mode button'/>
                                {t('Mode Follow-me')}
                            </div>
                        </NavLink>
                    </div>
                    <div className='content-block-mode-sous'>
                        <NavLink to="/mode_robot/teleop-move">
                            <div className='content-block-mode-sous-button'>
                                <img src={ teleop } alt='teleop mode button'/>
                                {t('Mode Teleoperation')}
                            </div>
                        </NavLink>
                        <NavLink to="/mode_robot/manuel">
                            <div className='content-block-mode-sous-button'>
                                <img src={ manuel } alt='manuel mode button'/>
                                {t('Mode Manuel')}
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default Mode;