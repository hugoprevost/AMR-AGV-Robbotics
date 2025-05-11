//     ////////////////////////////////////////////////////////////////////////////////////////////////////
//     /******************************************END DEBUG***********************************************/
//     /*    setBatteryLevel(0)                                                                          */
//     /*    setBatteryLevel(25)                                                                         */
//     /*    setBatteryLevel(100)                                                                        */                             
//     ////////////////////////////////////////////////////////////////////////////////////////////////////                                                                                                               
//     /*    setRobotName('idefix')                                                                      */
//     ////////////////////////////////////////////////////////////////////////////////////////////////////                                                                                                                                               
//     /*    setRobotInformation('error')                                                                */   
//     /*    setRobotInformation('warning')                                                              */                                                
//     /*    setRobotInformation('auto')                                                                 */
//     /*    setRobotInformation('charging')                                                             */    
//     ////////////////////////////////////////////////////////////////////////////////////////////////////
//     /*    setRobotState('errorState')                                                                 */
//     /*    setRobotState('warnState')                                                                       */
//     /*    setRobotState('chargeState')                                                                */
//     /*    setRobotState('blockState')                                                                */
//     /*    setRobotState('validState')                                                                      */             
//     ////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Wifi from '../wifi-level/wifi-level';
import sherpaLogo from '../../assets/logo/sherpa_logo.svg';
import BatteryProgressBar from '../battery-level/battery-level';
import { RobotStateEnum } from '../../enums/robot-state.enum';
import './header.scss';

const Header = () => {
    const { t, i18n } = useTranslation();  // Assurez-vous que `useTranslation` est appelé avant toute condition
    const location = useLocation();

    const [robotInformation, setRobotInformation] = useState(RobotStateEnum.AUTO);
    const [robotName, setRobotName] = useState('Chargement...');
    const [navigationMode, setNavigationMode] = useState('');
    const [lowBatteryLevel, setLowBatteryLevel] = useState(15);
    const [batteryLevel, setBatteryLevel] = useState(50);
    const [robotState, setRobotState] = useState(RobotStateEnum.VALID);

    // Utilisation de `useCallback` pour définir les fonctions de mise à jour
    const fetchRobotName = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5001/options/lock/affichage');
            // setRobotName(response.data.nom);
            const nomLimite = response.data.nom ? response.data.nom.slice(0, 14) : "Nom introuvable"; // Limite à 20 caractères
            setRobotName(nomLimite);
        } catch (error) {
            console.error("Erreur lors de la récupération du nom du robot", error);
            setRobotName("Nom introuvable");
        }
    }, []);

    
    useEffect(() => {
        fetchRobotName();  
    }, [fetchRobotName]);  


    useEffect(() => {
        const fetchNavigationMode = () => {
            let mode = '';
            if (location.pathname.includes('manuel')) {
                mode = t('Manuel');
            } else if (location.pathname.includes('follow-me')) {
                mode = t('Follow Me');
            } else if (location.pathname.includes('teleop')) {
                mode = t('Téléopération');
            } else {
                mode = t('Automatique');
            }
            setNavigationMode(mode);
        };
        fetchNavigationMode();
    }, [location.pathname, t]);


    useEffect(() => {
        if (navigationMode) {
            axios.post('http://localhost:5001/', {
                modeConduite: navigationMode
            })
            .catch(error => {
                console.error("Erreur lors de l'enregistrement du mode de conduite :", error);
            });
        }
    }, [navigationMode]);


    useEffect(() => {
        const fetchBatteryLevel = async () => {
            try {
                const response = await axios.get('http://localhost:5001/battery');
                let battery = response.data.batteryLevel;
                battery = Math.max(0, Math.min(100, battery));
                setBatteryLevel(battery);
            } catch (error) {
                console.error("Erreur récupération niveau de batterie :", error);
            }
        };
        fetchBatteryLevel();
        const interval = setInterval(fetchBatteryLevel, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchRobotState = async () => {
            try {
                const response = await axios.get('http://localhost:5001/state'); 
                setRobotState(response.data.state); // Mettre à jour l'état du robot
            } catch (error) {
                console.error("Erreur lors de la récupération de l'état du robot:", error);
            }
        };
    
        fetchRobotState();
        const interval = setInterval(fetchRobotState, 5000); // Rafraîchir toutes les 5s
    
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (robotState === RobotStateEnum.ERRORSTATE) {
            setRobotInformation(RobotStateEnum.ERROR);
        } else if (robotState === RobotStateEnum.VALIDSTATE) {
            setRobotInformation(RobotStateEnum.AUTO);
        } else if (robotState === RobotStateEnum.BLOCKSTATE) {
            setRobotInformation(RobotStateEnum.AUTO);
        } else if (robotState === RobotStateEnum.CHARGESTATE) {
            setRobotInformation(RobotStateEnum.CHARGING);
        } else if (robotState === RobotStateEnum.WARNSTATE) {
            setRobotInformation(RobotStateEnum.WARNING);
        }
    }, [robotState]);

    useEffect(() => {
        if (robotInformation === RobotStateEnum.ERROR) {
            setRobotState(RobotStateEnum.ERRORSTATE);
        } else if (robotInformation === RobotStateEnum.AUTO) {
            setRobotState(RobotStateEnum.VALIDSTATE);
        } else if (robotInformation === RobotStateEnum.CHARGING) {
            setRobotState(RobotStateEnum.CHARGESTATE);
        } else if (robotInformation === RobotStateEnum.WARNING) {
            setRobotState(RobotStateEnum.WARNSTATE);
        }
    }, [robotInformation]);
    
    return (
        <header className={robotInformation}>
            <div className='left'>
                <img src={sherpaLogo} alt='Sherpa logo' className='sherpa-logo' />
            </div>
            <div className='center'>
                <div className='robot-name ft-header-caps'>
                    {robotName}
                </div>
                <div className='navigation-mode ft-header-caps'>
                    {t('mode : ')} {navigationMode}
                </div>
            </div>
            <div className='right'>
                <div className={`robot-state-indicator ${robotState}`}></div>
                <Wifi /> 
                <BatteryProgressBar
                    value={batteryLevel}
                    height='30px'
                    lowBatteryLevel={lowBatteryLevel}
                    className='custom-progress-bar'
                />
            </div>
        </header>
    );
};

export default Header;