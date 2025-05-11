import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './teleop-upper.scss';
import ButtonBack from '../../../components/button-back/button-back';
import SherpaD from '../../../assets/img/Sherpa_D_profil.png'
import SherpaB from '../../../assets/img/sherpa_B_profil.png'
import SherpaP from '../../../assets/img/sherpa_P_profil.png'
import SherpaF from '../../../assets/img/sherpa_F_profil.png'

import MoveUp from '../../../assets/img/move/MoveUp.svg';
import MoveBack from '../../../assets/img/move/MoveBack.svg';
import movingUp from '../../../assets/img/move/movingUp.svg';
import movingDown from '../../../assets/img/move/movingDown.svg';
  
const Teleop = () => {

    const { t } = useTranslation();
    const [value, setValue] = useState()
    const [hMin, setHMin] = useState();
    const [hMax, setHMax] = useState();
    const [gap, setGap] = useState();
    const [showImage, setShowImage] = useState(false)
    const [showImage1, setShowImage1] = useState(false)
    const [robotModel, setRobotModel] = useState('');

    useEffect(() => {
        // Appel à l'API pour récupérer le modèle du robot
        axios.get('http://localhost:5001/model')
            .then((response) => {
                setRobotModel(response.data.modelRobot);  // Assurez-vous que le modèle est dans la réponse
            })
            .catch((error) => {
                console.error('Erreur de récupération du modèle:', error);
            });
    }, []);

    const renderImage = () => {
        if (robotModel === 'SherpaD') {
            return SherpaD;
        } else if (robotModel === 'SherpaB') {
            return SherpaB;
        } else if (robotModel === 'SherpaP') {
            return SherpaP;
        } else if (robotModel === 'SherpaF') {
            return SherpaF;
        }
        return null;
    };

    const fetchValueFromDatabase = async () => {
        try {
            const response = await fetch("http://localhost:5001/mode_robot/teleop-upper");
            if (!response.ok) throw new Error("Erreur de récupération");
    
            const data = await response.json();

            if (data.value !== undefined) setValue(data.value);
            if (data.hMin !== undefined) setHMin(data.hMin);
            if (data.hMax !== undefined) setHMax(data.hMax);
            if (data.gap !== undefined) setGap(data.gap);
    
        } catch (error) {
            console.error("Erreur :", error);
        }
    }

    const saveToDatabase = async (newValue) => {
        const dataToSend = {
            value: newValue,
            hMin: hMin,
            hMax: hMax,
            gap: gap,
        };
    
        try {
            const response = await fetch("http://localhost:5001/mode_robot/teleop-upper", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            })
    
            if (!response.ok) {
                throw new Error("Erreur lors de l'enregistrement")
            }
    
        } catch (error) {
            console.error("Erreur :", error)
        }
    }

    useEffect(() => {
        fetchValueFromDatabase()
    }, [])

    const handleClick = () => {
        if (value + gap <= hMax) {
            setValue((prevValue) => {
                const updatedValue = Math.round((prevValue + gap) * 100) / 100;
                saveToDatabase(updatedValue);
                return updatedValue;
            });
            setShowImage(true);
            setShowImage1(false);
            setTimeout(() => {
                setShowImage(false);
            }, 1000);
        }
    }

    const handleClick1 = () => {
        if (value - gap >= hMin) {
            setValue((prevValue) => {
                const updatedValue = Math.round((prevValue - gap) * 100) / 100;
                saveToDatabase(updatedValue);
                return updatedValue;
            });
            setShowImage1(true);
            setShowImage(false);
            setTimeout(() => {
                setShowImage1(false);
            }, 1000);
        }
    }
   
    return (
        <>
            <div className='teleop-upper-content'>
                <div className='back-button'>
                    <NavLink to="/mode_robot">
                        <ButtonBack/>
                    </NavLink>
                </div>
                <div className='content-teleop-upper-left-title'>
                    {t('Déplacement Teleop :')}
                </div>
                <div className='content-teleop-upper'>
                    <div className='content-teleop-upper-left'>
                        <div className='content-teleop-upper-left-button'>
                            <NavLink to="/mode_robot/teleop-move">
                                <button className='content-teleop-upper-left-button-move'>
                                    {t('Déplacement')}
                                </button>
                            </NavLink>
                            <button className='content-teleop-upper-left-button-upper'>
                                {t('Élévation')}
                            </button>
                        </div>
                    </div>
                    <div className='content-teleop-upper-center'>
                        <img src={ renderImage() } alt='Sherpa D profil' className='content-teleop-upper-center-img'/>
                        <div className='content-teleop-upper-center-text'>
                            {t('Hauteur :')} {value} m
                        </div>
                    </div>
                    <div className='content-teleop-upper-right'>
                        <button onClick={handleClick} className='content-teleop-upper-right-up'>
                            <img src={ MoveUp } alt='Elevation de la palette'/>
                            {showImage && <img src={ movingUp } alt='Arrow Up' className='img-movingUp-pal' />}
                        </button>
                        <button  onClick={handleClick1} className='content-teleop-upper-right-back'>
                            <img src={ MoveBack } alt='Descente de la palette'/>
                            {showImage1 && <img src={ movingDown } alt='Arrow Down' className='img-movingDown-pal' />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default Teleop;