import React, {useState, useEffect, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './teleop-move.scss';
import ButtonBack from '../../../components/button-back/button-back';
import JoystickComp from '../../../components/joystick/joystick';
import SherpaD from '../../../assets/img/sherpaD.png';
import SherpaB from '../../../assets/img/sherpaB.png'
import SherpaP from '../../../assets/img/sherpaP.png'
import SherpaF from '../../../assets/img/sherpaF.png'

import MoveUp from '../../../assets/img/move/MoveUp.svg';
import MoveBack from '../../../assets/img/move/MoveBack.svg';
import MoveLeft from '../../../assets/img/move/MoveLeft.svg';
import MoveRight from '../../../assets/img/move/MoveRight.svg';

import movingUp from '../../../assets/img/move/movingUp.svg';
import movingDown from '../../../assets/img/move/movingDown.svg';
import rotateLeft from '../../../assets/img/move/rotateLeft.svg';
import rotateRight from '../../../assets/img/move/rotateRight.svg';
  
const Teleop = () => {

    const { t } = useTranslation();
    const [showImage, setShowImage] = useState(false)
    const [showImage1, setShowImage1] = useState(false)
    const [showImage2, setShowImage2] = useState(false)
    const [showImage3, setShowImage3] = useState(false)
    const [rotateImg, setRotateImg] = useState(180)
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
        return null;  // Si aucune image correspond
    };

    const [data, setData] = useState({
        direction: 0,
        x: 0,
        y: 0
    });
    const [isButtonPressed, setIsButtonPressed] = useState(false)
    const sendInterval = useRef(null)
    
    const sendDataToBackend = async (data) => {
        if (data) {
          try {
            await fetch('http://localhost:5001/mode_robot/teleop-move', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            console.log('Données envoyées au backend :', data);
          } catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend:', error);
          }
        }
    };
    
    const handleButtonPress = (direction) => {
        let newData = { ...data };

        switch (direction) {
        case 'up':
            newData = { direction: 'up', x: 0, y: 1 };  // Avancer
            let valueImg = showImage
            if (valueImg === false){
                setShowImage(true)
                setShowImage1(false)
                setShowImage2(false)
                setShowImage3(false)
                setRotateImg(180)
            } else {
                setShowImage(false)
                setRotateImg(180)
            }
            break
        case 'down':
            newData = { direction: 'down', x: 0, y: -1 };  // Reculer
            let valueImg3 = showImage3    
            if (valueImg3 === false){
                setShowImage3(true)
                setShowImage(false)
                setShowImage2(false)
                setShowImage1(false)
                setRotateImg(180)
            } else {
                setShowImage3(false)
                setRotateImg(180)
            }
            break
        case 'left':
            newData = { direction: 'left', x: -1, y: 0 };  // Aller à gauche
            let valueImg1 = showImage1
        if (valueImg1 === false){
            setShowImage1(true)
            setShowImage(false)
            setShowImage2(false)
            setShowImage3(false)
            setRotateImg(rotateImg - 30)
        } else {
            setShowImage1(false)
            setRotateImg(180)
        }
            break
        case 'right':
            newData = { direction: 'right', x: 1, y: 0 };  // Aller à droite
            let valueImg2 = showImage2
            if (valueImg2 === false){
                setShowImage3(false)
                setShowImage(false)
                setShowImage2(true)
                setShowImage1(false)
                setRotateImg(rotateImg + 30)
            } else {
                setShowImage2(false)
                setRotateImg(180)
            }
            break
        default:
            break
        }

        setData(newData);
        if (!isButtonPressed) {
            setIsButtonPressed(true)
            sendInterval.current = setInterval(() => {
              sendDataToBackend(newData)
            }, 500) // Actualisation 500ms
        }
        
    }

    // Fonction pour arrêter l'envoi des données lorsque le bouton est relâché
    const handleButtonRelease = () => {
        setIsButtonPressed(false);
        setRotateImg(180)
        setShowImage3(false)
        setShowImage(false)
        setShowImage2(false)
        setShowImage1(false)
        clearInterval(sendInterval.current); // Arrêter l'envoi continu
        sendDataToBackend({
            x: 0,
            y: 0
        }); // Envoyer des données 0 lorsque le bouton est relâché
    }


    // Fonction pour arrêter l'envoi des données (réinitialisation)
    const handleStop = () => {
        setData({
        x: 0,
        y: 0
        })
        sendDataToBackend({
        x: 0,
        y: 0
        })
        setShowImage3(false)
        setShowImage(false)
        setShowImage2(false)
        setShowImage1(false)
        setRotateImg(180)
    };

    const handleJoystickMove = (event) => {
        const { x, y } = event;
        console.log(`Joystick moved: x=${x}, y=${y}`); // Debug log
        let newRotation = 180;

        if (x > 0.5 && Math.abs(y) < 0.5) {
            newRotation = 270; // Droite
        } else if (x < -0.5 && Math.abs(y) < 0.5) {
            newRotation = 90;  // Gauche
        } else if (y > 0.5 && Math.abs(x) < 0.5) {
            newRotation = 180; // Bas
        } else if (y < -0.5 && Math.abs(x) < 0.5) {
            newRotation = 0;   // Haut
        }
        
        setRotateImg(newRotation);
    };

    
    return (
        <>
            <div className='teleop-content'>
                <div className='back-button'>
                    <NavLink to="/mode_robot">
                        <ButtonBack/>
                    </NavLink>
                </div>
                <div className='content-teleop-left-title'>
                    {t('Déplacement Teleop :')}
                </div>
                <div className='content-teleop'>
                    <div className='content-teleop-left'>
                        <div className='content-teleop-left-button'>
                            <button className='content-teleop-left-button-move'>
                                {t('Déplacement')}
                            </button>
                            <NavLink to="/mode_robot/teleop-upper">
                                <button className='content-teleop-left-button-upper'>
                                    {t('Élévation')}
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    {/* <div className='content-teleop-center'>
                        <img src={ SherpaB } alt='Sherpa D' className='content-teleop-center-img' style={{rotate: `${rotateImg}deg`}} />
                    </div> */}
                    <div className='content-teleop-center'>
                        <img src={ renderImage() } alt='Sherpa' className='content-teleop-center-img' style={{rotate: `${rotateImg}deg`}} />
                    </div>
                    <div className='content-teleop-right'>
                        <button onMouseDown={() => handleButtonPress('up')} onMouseUp={handleButtonRelease}
                        onTouchStart={() => handleButtonPress('up')}
                        onTouchEnd={handleButtonRelease} className='content-teleop-right-up'>
                            <img src={ MoveUp } alt='Arrow up' />
                            {showImage && <img src={ movingUp } alt='Arrow up' className='img-movingUp' />}
                        </button>
                        <div className='content-teleop-right-rotate'>
                            <button onMouseDown={() => handleButtonPress('left')} 
                            onMouseUp={handleButtonRelease}
                            onTouchStart={() => handleButtonPress('left')}
                            onTouchEnd={handleButtonRelease} className='content-teleop-right-rotate-left'>
                                <img src={ MoveLeft } alt='Rotate left' />
                                {showImage1 && <img src={ rotateLeft } alt='Rotate left' className='img-rotateLeft' />}
                                
                            </button>
                            <button onClick={handleStop} className='content-teleop-right-rotate-center'>
                            
                            </button>
                            <button onMouseDown={() => handleButtonPress('right')} 
                            onMouseUp={handleButtonRelease}
                            onTouchStart={() => handleButtonPress('right')}
                            onTouchEnd={handleButtonRelease}className='content-teleop-right-rotate-right'>
                                <img src={ MoveRight } alt='Rotate right' />
                                {showImage2 && <img src={ rotateRight } alt='Rotate right' className='img-rotateRight' />}
                                
                            </button>
                        </div>
                        <button onMouseDown={() => handleButtonPress('down')} 
                        onMouseUp={handleButtonRelease}
                        onTouchStart={() => handleButtonPress('down')}
                        onTouchEnd={handleButtonRelease} className='content-teleop-right-back'>
                            <img src={ MoveBack } alt='Arrow Down' className='content-teleop-right-back-arro' />
                            {showImage3 && <img src={ movingDown } alt='Arrow Down' className='img-movingDown' />}
                            
                        </button>
                    </div> 
                    <div className='content-teleop-right-joystick'>
                        <JoystickComp move={handleJoystickMove}/>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default Teleop;