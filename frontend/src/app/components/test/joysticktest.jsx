import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Joystick } from 'react-joystick-component';
import './joystick.scss';

import movingUp from '../../assets/img/move/movingUp.svg';
import movingDown from '../../assets/img/move/movingDown.svg';
import rotateLeft from '../../assets/img/move/rotateLeft.svg';
import rotateRight from '../../assets/img/move/rotateRight.svg';

function GobeJoystickController({ move, start, stop }) {
  const [containerDiv, setContainerDiv] = useState();
  const containerStyle = useRef({
    width: '200px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  }).current;

  const baseColor = useMemo(() => `radial-gradient(circle at 50% 50%, rgba(42, 47, 86, 1),rgba(24, 27, 49, 1))`);
  const stickColor = useMemo(() => `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1),rgba(119, 119, 119, 1))`);

  return (
    <div ref={setContainerDiv} style={containerStyle} className="test">
      {containerDiv ? (
        <Joystick size={200} stickSize={80} baseColor={baseColor} stickColor={stickColor} throttle={400} move={move} stop={stop} start={start} />
      ) : null}
    </div>
  );
}

function JoystickComp() {
  const [direction, setDirection] = useState('');
  const [showImage1, setShowImage1] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const [showImage3, setShowImage3] = useState(false);
  const [showImage4, setShowImage4] = useState(false);

  const [data, setData] = useState({ x: 0, y: 0 });
  const [lastData, setLastData] = useState({ x: 0, y: 0 });
  const [sentData, setSentData] = useState({ x: 0, y: 0 }); // État pour suivre les données envoyées

  const sendInterval = useRef(null);
  const lastSentTime = useRef(0);

  const deadzoneThreshold = 0.05; // Zone morte pour ignorer les petites valeurs proches de zéro

  // Fonction pour envoyer les données au backend
  const sendDataToBackend = async (data) => {
    console.log('Envoi des données au backend:', data); // Log des données envoyées
    try {
      const response = await fetch('http://localhost:5000/mode_robot/teleop-move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Réponse du backend:', responseData);

      if (response.ok) {
        console.log('Données envoyées avec succès');
        setSentData(data); // Mettre à jour les données envoyées
      } else {
        console.error('Erreur dans la réponse du backend', responseData);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données au backend:", error);
    }
  };

  // Fonction pour appliquer la zone morte (deadzone)
  const applyDeadzone = (value) => {
    if (Math.abs(value) < deadzoneThreshold) {
      return 0; // Si la valeur est trop petite, on la remet à zéro
    }
    return value;
  };

  // Fonction pour détecter les mouvements du joystick de la manette
  const handleGamepadInput = () => {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0]; // Supposons que la première manette est utilisée

    if (gamepad) {
      let x = gamepad.axes[0]; // Axe horizontal (généralement gauche/droite)
      let y = gamepad.axes[1]; // Axe vertical (généralement haut/bas)

      // Appliquer la zone morte (deadzone)
      x = applyDeadzone(x);
      y = applyDeadzone(-y); // Inverser l'axe Y pour que le haut soit négatif et le bas positif

      // Si les valeurs sont trop proches de zéro, le joystick est considéré comme relâché
      if (Math.abs(x) < deadzoneThreshold && Math.abs(y) < deadzoneThreshold) {
        x = 0;
        y = 0; // Réinitialiser à zéro quand le joystick est à l'arrêt
      }

      // Mettre à jour les données du joystick
      setData({ x, y });

      // Afficher les images selon la direction du mouvement
      if (x > 0.5 && Math.abs(y) < 0.5) {
        setShowImage1(true);
        setShowImage2(false);
        setShowImage3(false);
        setShowImage4(false);
      } else if (x < -0.5 && Math.abs(y) < 0.5) {
        setShowImage1(false);
        setShowImage2(true);
        setShowImage3(false);
        setShowImage4(false);
      } else if (y < -0.5 && Math.abs(x) < 0.5) {
        setShowImage1(false);
        setShowImage2(false);
        setShowImage3(true);
        setShowImage4(false);
      } else if (y > 0.5 && Math.abs(x) < 0.5) {
        setShowImage1(false);
        setShowImage2(false);
        setShowImage3(false);
        setShowImage4(true);
      } else {
        setShowImage1(false);
        setShowImage2(false);
        setShowImage3(false);
        setShowImage4(false);
      }
    }
  };

  // Démarrer l'envoi des données si elles changent
  const startSendingData = () => {
    if (!sendInterval.current) {
      sendInterval.current = setInterval(() => {
        const currentTime = Date.now();
        // Vérifier si les données ont changé avant d'envoyer et si l'intervalle de 500ms est respecté
        if ((data.x !== lastData.x || data.y !== lastData.y) && currentTime - lastSentTime.current >= 500) {
          if (JSON.stringify(data) !== JSON.stringify(sentData)) {
            sendDataToBackend(data); // Envoi des données au backend
            setLastData(data); // Mettre à jour les dernières données envoyées
            lastSentTime.current = currentTime; // Mettre à jour le dernier temps d'envoi
          }
        }
      }, 100); // Vérifier toutes les 100ms
    }
  };

  // Arrêter l'envoi des données
  const stopSendingData = () => {
    if (sendInterval.current) {
      clearInterval(sendInterval.current);
      sendInterval.current = null;
    }
  };

  // Fonction de démarrage
  const handleStart = () => {
    setShowImage1(false);
    setShowImage2(false);
    setShowImage3(false);
    setShowImage4(false);
  };

  // Fonction de stop
  const handleStop = () => {
    setShowImage1(false);
    setShowImage2(false);
    setShowImage3(false);
    setShowImage4(false);
    setData({ x: 0, y: 0 });
    stopSendingData();
    sendDataToBackend({ x: 0, y: 0 });
  };

  // Fonction qui gère les mouvements du joystick sur l'interface
  const handleMove = (e) => {
    let { x, y } = e;

    // Appliquer la zone morte (deadzone)
    x = applyDeadzone(x);
    y = applyDeadzone(y);

    // Si les valeurs sont proches de zéro, on considère que le joystick est relâché
    if (Math.abs(x) <= deadzoneThreshold && Math.abs(y) <= deadzoneThreshold) {
      setData({ x: 0, y: 0 });
    } else {
      setData({ x, y });
    }

    // Afficher les images selon la direction du mouvement
    if (x > 0.5 && Math.abs(y) < 0.5) {
      setShowImage1(true);
      setShowImage2(false);
      setShowImage3(false);
      setShowImage4(false);
    } else if (x < -0.5 && Math.abs(y) < 0.5) {
      setShowImage1(false);
      setShowImage2(true);
      setShowImage3(false);
      setShowImage4(false);
    } else if (y < -0.5 && Math.abs(x) < 0.5) {
      setShowImage1(false);
      setShowImage2(false);
      setShowImage3(true);
      setShowImage4(false);
    } else if (y > 0.5 && Math.abs(x) < 0.5) {
      setShowImage1(false);
      setShowImage2(false);
      setShowImage3(false);
      setShowImage4(true);
    } else {
      setShowImage1(false);
      setShowImage2(false);
      setShowImage3(false);
      setShowImage4(false);
    }
  };

  useEffect(() => {
    const gamepadCheckInterval = setInterval(() => {
      handleGamepadInput(); // Vérifier l'état du gamepad à intervalles réguliers
    }, 100);

    // Nettoyage du gamepadCheckInterval
    return () => clearInterval(gamepadCheckInterval);
  }, []);

  useEffect(() => {
    // Lancer l'envoi des données si elles changent
    if (data.x !== sentData.x || data.y !== sentData.y) {
      startSendingData();
    } else {
      stopSendingData(); // Arrêter l'envoi si aucune donnée n'a changé
    }

    return () => stopSendingData();
  }, [data]);

  return (
    <div>
      <div>
        <GobeJoystickController move={handleMove} stop={handleStop} start={handleStart} />
      </div>
      <div>
        <div className="robot-chevronUp">
          {showImage4 && <img src={movingUp} alt="Arrow up" className="robot-chevronUp-img" />}
        </div>
        <div className="robot-chevronDown">
          {showImage3 && <img src={movingDown} alt="Arrow down" className="robot-chevronUp-img" />}
        </div>
        <div className="robot-chevronLeft">
          {showImage2 && <img src={rotateLeft} alt="Rotate left" className="robot-chevronUp-img" />}
        </div>
        <div className="robot-chevronRight">
          {showImage1 && <img src={rotateRight} alt="Rotate right" className="robot-chevronUp-img" />}
        </div>
      </div>
    </div>
  );
}

export default JoystickComp;