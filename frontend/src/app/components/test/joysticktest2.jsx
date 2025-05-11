import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Joystick } from "react-joystick-component"
import './joystick.scss'

import movingUp from '../../assets/img/move/movingUp.svg'
import movingDown from '../../assets/img/move/movingDown.svg'
import rotateLeft from '../../assets/img/move/rotateLeft.svg'
import rotateRight from '../../assets/img/move/rotateRight.svg'

function GobeJoystickController({
  move,
  start,
  stop
}) 
{
  const [containerDiv, setContainerDiv] = useState();
  const containerStyle = useRef({
    width: "200px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    margin: "20px"
  }).current

  const baseColor = useMemo(() => `radial-gradient(circle at 50% 50%, rgba(42, 47, 86, 1),rgba(24, 27, 49, 1))`)
  const stickColor = useMemo(() => `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1),rgba(119, 119, 119, 1))`)
  
  return (
    <div ref={setContainerDiv} style={containerStyle} className='test'>
      {containerDiv ? (
        <Joystick
          size={200}
          stickSize={80}
          baseColor={baseColor}
          stickColor={stickColor}
          throttle={400}
          move={move}
          stop={stop}
          start={start}
        />
        
      ) : null}
    </div>
  )
}

function JoystickComp() {
  const [direction, setDirection] = useState('')
  const [showImage1, setShowImage1] = useState(false)
  const [showImage2, setShowImage2] = useState(false)
  const [showImage3, setShowImage3] = useState(false)
  const [showImage4, setShowImage4] = useState(false)
  
  const [data, setData] = useState(null);
  const sendInterval = useRef(null);  // Utilisation de useRef pour éviter que l'intervalle soit réinitialisé

  const sendDataToBackend = async (data) => {
    if (data) {
      try {
        await fetch('http://localhost:5000/mode_robot/teleop-move', {
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
  }  

  const handleMove = (e) => {
    const {x, y} = e
    if (x > 0.5 && -0.5 < y && y < 0.5) {
      setDirection('right')
      setShowImage1(true)
      setShowImage2(false)
      setShowImage3(false)
      setShowImage4(false)
    } else if (x < -0.5 && -0.5 < y && y < 0.5) {
      setDirection('left')
      setShowImage1(false)
      setShowImage2(true)
      setShowImage3(false)
      setShowImage4(false)
    } else if (y < -0.5 && -0.5 < x && x < 0.5) {
      setDirection('down')
      setShowImage1(false)
      setShowImage2(false)
      setShowImage3(true)
      setShowImage4(false)
    } else if (y > 0.5 && -0.5 < x && x < 0.5) {
      setDirection('up')
      setShowImage1(false)
      setShowImage2(false)
      setShowImage3(false)
      setShowImage4(true)
    } else {
      setDirection('')
      setShowImage1(false)
      setShowImage2(false)
      setShowImage3(false)
      setShowImage4(false)
    }
    // console.log(e)
    // const joystickData = {
    //   x: e.x,       // Horizontal du joystick
    //   y: e.y        // Vertical du joystick
    // };
    // setData(joystickData);
    // sendDataToBackend(joystickData);

    setData({
      x: e.x,       // Horizontal du joystick
      y: e.y        // Vertical du joystick
    });
  }
  const startSendingData = () => {
    // Vérifiez si l'intervalle est déjà en cours
    if (!sendInterval.current) {
      sendInterval.current = setInterval(() => {
        if (data) {
          sendDataToBackend(data);
        }
      }, 500); // Envoi toutes les 1000 ms (1 seconde)
    }
  };

  // Fonction pour arrêter l'envoi des données
  const stopSendingData = () => {
    if (sendInterval.current) {
      clearInterval(sendInterval.current);
      sendInterval.current = null;
    }
  };

  const handleStop = () => {
    setShowImage1(false)
    setShowImage2(false)
    setShowImage3(false)
    setShowImage4(false)
    setData({
      x: 0,
      y: 0
    }); // Réinitialiser les données après l'envoi
    stopSendingData();

    // Partie a enlever pour verifier
    sendDataToBackend({
      x: 0,
      y: 0
    });
    // Partie a enlever pour verifier
    
  }
  const handleStart = (e) => {
    setShowImage1(false)
    setShowImage2(false)
    setShowImage3(false)
    setShowImage4(false)
  }

  useEffect(() => {
    // Si des données sont mises à jour (joystick en mouvement), commencez l'envoi toutes les secondes
    if (data && (data.x !== 0 || data.y !== 0)) {
      startSendingData();
    } else {
      // Si aucune donnée, arrêtez l'envoi
      stopSendingData();
    }

    return () => {
      // Nettoyage lorsque le composant est démonté
      stopSendingData();
    };
  }, [data]);
  
  return (
    <div>
      <div>
        <GobeJoystickController
          opactiy={1}
          move={handleMove}
          stop={handleStop}
          start={handleStart}
        />
      </div>
      <div>
        <div className='robot-chevronUp'>
          {showImage4 &&<img src={ movingUp } alt='Arrow up' className='robot-chevronUp-img'/>}
        </div>
        <div className='robot-chevronDown'>
          {showImage3 &&<img src={ movingDown } alt='Arrow down' className='robot-chevronUp-img'/>}
        </div>
        <div className='robot-chevronLeft'>
          {showImage2 &&<img src={ rotateLeft } alt='Rotate left' className='robot-chevronUp-img'/>}
        </div>
        <div className='robot-chevronRight'>
          {showImage1 &&<img src={ rotateRight } alt='Rotate right' className='robot-chevronUp-img'/>}
        </div>
      </div>
    </div>
  )
}

export default JoystickComp;