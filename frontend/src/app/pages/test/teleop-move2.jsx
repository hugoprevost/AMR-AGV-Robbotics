import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './teleop.scss';
import ButtonBack from '../../../components/button-back/button-back';
import JoystickComp from '../../../components/joystick/joystick2';
import SherpaD from '../../../assets/img/sherpaD.png';

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
    const handleClick = () => {
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
    }
    const [showImage1, setShowImage1] = useState(false)
    const handleClick1 = () => {
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
    }
        
    const [showImage2, setShowImage2] = useState(false)
    const handleClick2 = () => {
        let valueImg2 = showImage2
            
        if (valueImg2 === false){
            setShowImage2(true)
            setShowImage(false)
            setShowImage1(false)
            setShowImage3(false)
            setRotateImg(rotateImg + 30)
        } else {
            setShowImage2(false)
            setRotateImg(180)
        }
    }

    const [showImage3, setShowImage3] = useState(false)
    const handleClick3 = () => {
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
    }

    const [rotateImg, setRotateImg] = useState(180)
    const handleClick4 = () => {
        setShowImage3(false)
        setShowImage(false)
        setShowImage2(false)
        setShowImage1(false)
        setRotateImg(180)
    }
    
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
                    <div className='content-teleop-center'>
                        <img src={ SherpaD } alt='Sherpa D' className='content-teleop-center-img' style={{rotate: `${rotateImg}deg`}} />
                    </div>
                    <div className='content-teleop-right'>
                        <button onClick={handleClick} className='content-teleop-right-up'>
                            <img src={ MoveUp } alt='Arrow up' />
                            {showImage && <img src={ movingUp } alt='Arrow up' className='img-movingUp' />}
                            {console.log("move-up")}
                        </button>
                        <div className='content-teleop-right-rotate'>
                            <button onClick={handleClick1} className='content-teleop-right-rotate-left'>
                                <img src={ MoveLeft } alt='Rotate left' />
                                {showImage1 && <img src={ rotateLeft } alt='Rotate left' className='img-rotateLeft' />}
                                {console.log("rotate-left")}
                            </button>
                            <button onClick={handleClick4} className='content-teleop-right-rotate-center'>
                            {console.log("reset")}
                            </button>
                            <button onClick={handleClick2} className='content-teleop-right-rotate-right'>
                                <img src={ MoveRight } alt='Rotate right' />
                                {showImage2 && <img src={ rotateRight } alt='Rotate right' className='img-rotateRight' />}
                                {console.log("rotate-right")}
                            </button>
                        </div>
                        <button onClick={handleClick3} className='content-teleop-right-back'>
                            <img src={ MoveBack } alt='Arrow Down' className='content-teleop-right-back-arro' />
                            {showImage3 && <img src={ movingDown } alt='Arrow Down' className='img-movingDown' />}
                            {console.log("move-back")}
                        </button>
                    </div> 
                    <div className='content-teleop-right-joystick'>
                        <JoystickComp/>
                    </div>
                </div>
            </div>
        </>
    )

}
  
export default Teleop;