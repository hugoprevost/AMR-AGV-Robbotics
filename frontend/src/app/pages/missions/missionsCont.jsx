// import { Navigate, useParams, NavLink } from "react-router-dom";
// import React, {useState} from "react";
// import { useTranslation } from 'react-i18next';
// import missionInfos from "../../assets/mission";
// import ButtonBack from '../../components/button-back/button-back';
// import PlayButton from '../../assets/img/btn/play.svg'
// import PauseButton from '../../assets/img/btn/pause.svg'
// import StopButton from '../../assets/img/btn/stop.svg'
// import "./missionsCont.scss";

// function Test() {

//     const { t } = useTranslation();

//     const { id } = useParams();
//     const mission = missionInfos.find((mission) => mission.id === id);

//     const [buttonText, setButtonText] = useState(`${t('Play mission')}`)

//     const handleClick = () =>{
//         setButtonText(buttonText === `${t('Play mission')}` ? `${t('Pause mission')}` : `${t('Play mission')}`)
//     }

//     const [buttonImg, setButtonimg] = useState(PlayButton)

//     const changeImg = () =>{
//         let value = buttonImg

//         if (value === PlayButton){
//             setButtonimg(PauseButton)
//         } else {
//             setButtonimg(PlayButton)
//         }
//     }

//     console.log(mission)
//     if (!mission) {
//         return <Navigate to="/404" />;
//     }
//     const {
//         nom,
//         accroche
//     } = mission;

//     return (
//         <>
//             <div className="content-mission-start">
//                 <div className="mission-start-content">
//                     <NavLink to="/missions/favorite" className="mission-start-btn">
//                         <ButtonBack/>
//                     </NavLink>
//                     <div className="mission-start-titre">{t('Mission en cours :')} {nom}</div>
//                     <div className="mission-start-droite"></div>
//                 </div>
//                 <div>
//                     <div className="mission-start-texte">{accroche}</div>
//                 </div>
//                 <div className="mission-start-progres">
//                     <div className="mission-start-progres-start">
//                         0%
//                     </div>
//                     <div className="mission-start-progres-bar">
//                         <div className="mission-start-progres-bar-blue">

//                         </div>
//                         <div className="mission-start-btn-cmd">
//                             <div className="mission-start-btn-cmd-ctrl">
//                                 <button onClick={() =>{
//                                     handleClick()
//                                     changeImg()
//                                 }} 
//                                 className="mission-start-btn-cmd-ctrl-pause">
//                                     <img src={ buttonImg } alt='Icon pause' className="mission-start-btn-cmd-stop-btn-img"/>
//                                     {buttonText}
//                                     {/* {
//                                         console.log(buttonText)
//                                     } */}
//                                 </button>
//                             </div>
//                             <div className="mission-start-btn-cmd-stop">
//                                 <NavLink to="/">
//                                     <div className="mission-start-btn-cmd-stop-btn">
//                                         <img src={ StopButton } alt='Icon stop' className="mission-start-btn-cmd-stop-btn-img"/>
//                                         {t('Stop mission')}
//                                     </div>
//                                 </NavLink>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mission-start-progres-end">
//                         100%
//                     </div>
//                 </div> 
//             </div>
//         </>
//     );
// }
  
// export default Test



// import { Navigate, useParams, NavLink } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import ButtonBack from "../../components/button-back/button-back";
// import PlayButton from "../../assets/img/btn/play.svg";
// import PauseButton from "../../assets/img/btn/pause.svg";
// import StopButton from "../../assets/img/btn/stop.svg";
// import "./missionsCont.scss";

// function MissionContent() {
//   const { t } = useTranslation();
//   const { id } = useParams();

//   const [mission, setMission] = useState(null);
//   const [buttonImg, setButtonImg] = useState(PlayButton);
//   const [buttonText, setButtonText] = useState(`${t("Play mission")}`);

//   // Charger la mission depuis le backend
//   useEffect(() => {
//     fetch(`http://localhost:5000/missions/${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setMission(data);

//         // Mettre à jour le bouton selon l'état du backend
//         if (data.status === "playing") {
//           setButtonImg(PauseButton);
//           setButtonText(`${t("Pause mission")}`);
//         } else {
//           setButtonImg(PlayButton);
//           setButtonText(`${t("Play mission")}`);
//         }
//       })
//       .catch((error) => console.error("Erreur lors du chargement de la mission :", error));
//   }, [id]);

//   // Fonction pour changer l'état de la mission et l'envoyer au backend
//   const toggleMissionState = () => {
//     if (!mission) return;
  
//     const newStatus = mission.status === "playing" ? "paused" : "playing";
  
//     fetch(`http://localhost:5000/missions/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status: newStatus }),
//     })
//       .then((response) => response.json())
//       .then((updatedMission) => {
//         setMission(updatedMission);
//         setButtonImg(newStatus === "playing" ? PauseButton : PlayButton);
//         setButtonText(newStatus === "playing" ? `${t("Pause mission")}` : `${t("Play mission")}`);
//       })
//       .catch((error) => console.error("❌ Erreur lors de la mise à jour :", error));
//   };

//   const handleStop = () => {
//     fetch(`http://localhost:5000/missions/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status: "stopped" }),
//     })
//       .then((response) => response.json())
//       .then((updatedMission) => {
//         console.log("✅ Mission arrêtée :", updatedMission);
//         setMission(updatedMission); // Mettre à jour l'état si nécessaire
//       })
//       .catch((error) => console.error("❌ Erreur lors de l'arrêt de la mission :", error));
//   };

//   if (!mission) {
//     return <div>⏳ Chargement de la mission...</div>;
//   }

//   return (
//     <>
//       <div className="content-mission-start">
//         <div className="mission-start-content">
//           <NavLink to="/missions/favorite" className="mission-start-btn">
//             <ButtonBack />
//           </NavLink>
//           <div className="mission-start-titre">
//             {t("Mission en cours :")} {mission.nom}
//           </div>
//           <div className="mission-start-droite"></div>
//         </div>
//         <div>
//           <div className="mission-start-texte">{mission.accroche}</div>
//         </div>
//         <div className="mission-start-progres">
//           <div className="mission-start-progres-start">0%</div>
//           <div className="mission-start-progres-bar">
//             <div className="mission-start-progres-bar-blue"></div>
//             <div className="mission-start-btn-cmd">
//               <div className="mission-start-btn-cmd-ctrl">
//                 <button onClick={toggleMissionState} className="mission-start-btn-cmd-ctrl-pause">
//                   <img src={buttonImg} alt="Icon pause" className="mission-start-btn-cmd-stop-btn-img" />
//                   {buttonText}
//                 </button>
//               </div>
//               <div className="mission-start-btn-cmd-stop">
//                 <NavLink to="/">
//                     <div className="mission-start-btn-cmd-stop-btn" >
//                         <button onClick={handleStop} className="mission-start-btn-cmd-stop-btn" style={{ border: "none" }}>
//                             <img src={StopButton} alt="Icon stop" className="mission-start-btn-cmd-stop-btn-img" />
//                             {t("Stop mission")}
//                         </button>
//                     </div>
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//           <div className="mission-start-progres-end">100%</div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MissionContent;


import { Navigate, useParams, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonBack from "../../components/button-back/button-back";
import PlayButton from "../../assets/img/btn/play.svg";
import PauseButton from "../../assets/img/btn/pause.svg";
import StopButton from "../../assets/img/btn/stop.svg";
import "./missionsCont.scss";

function MissionContent() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [mission, setMission] = useState(null);
  const [buttonImg, setButtonImg] = useState(PlayButton);
  const [buttonText, setButtonText] = useState(`${t("Play mission")}`);

  // Charger la mission et mettre à jour lastOpenedAt
  useEffect(() => {
    // Charger la mission depuis le backend
    fetch(`http://localhost:5001/missions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMission(data);

        // Mettre à jour le bouton selon l'état du backend
        if (data.status === "playing") {
          setButtonImg(PauseButton);
          setButtonText(`${t("Pause mission")}`);
        } else {
          setButtonImg(PlayButton);
          setButtonText(`${t("Play mission")}`);
        }
      })
      .catch((error) => console.error("❌ Erreur lors du chargement de la mission :", error));

    // ✅ Mettre à jour lastOpenedAt dès l'ouverture de la mission
    fetch(`http://localhost:5001/missions/${id}/open`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "opened" }) // Envoie un statut valide pour éviter les erreurs
    })
      .then((response) => response.json())
      .then((updatedMission) => {
        console.log("✅ lastOpenedAt mis à jour :", updatedMission);
      })
      .catch((error) => console.error("❌ Erreur lors de la mise à jour de lastOpenedAt :", error));

  }, [id]);

  // Fonction pour changer l'état de la mission et l'envoyer au backend
  const toggleMissionState = () => {
    if (!mission) return;
  
    const newStatus = mission.status === "playing" ? "paused" : "playing";
  
    fetch(`http://localhost:5001/missions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedMission) => {
        setMission(updatedMission);
        setButtonImg(newStatus === "playing" ? PauseButton : PlayButton);
        setButtonText(newStatus === "playing" ? `${t("Pause mission")}` : `${t("Play mission")}`);
      })
      .catch((error) => console.error("❌ Erreur lors de la mise à jour :", error));
  };

  // Fonction pour arrêter la mission
  const handleStop = () => {
    fetch(`http://localhost:5001/missions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "stopped" }),
    })
      .then((response) => response.json())
      .then((updatedMission) => {
        console.log("✅ Mission arrêtée :", updatedMission);
        setMission(updatedMission); // Mettre à jour l'état si nécessaire
      })
      .catch((error) => console.error("❌ Erreur lors de l'arrêt de la mission :", error));
  };

  if (!mission) {
    return <div>⏳ Chargement de la mission...</div>;
  }

  return (
    <>
      <div className="content-mission-start">
        <div className="mission-start-content">
          <NavLink to="/missions/favorite" className="mission-start-btn">
            <ButtonBack />
          </NavLink>
          <div className="mission-start-titre">
            {t("Mission en cours :")} {mission.nom}
          </div>
          <div className="mission-start-droite"></div>
        </div>
        <div>
          <div className="mission-start-texte">{mission.accroche}</div>
        </div>
        <div className="mission-start-progres">
          <div className="mission-start-progres-start">0%</div>
          <div className="mission-start-progres-bar">
            <div className="mission-start-progres-bar-blue"></div>
            <div className="mission-start-btn-cmd">
              <div className="mission-start-btn-cmd-ctrl">
                <button onClick={toggleMissionState} className="mission-start-btn-cmd-ctrl-pause">
                  <img src={buttonImg} alt="Icon pause" className="mission-start-btn-cmd-stop-btn-img" />
                  {buttonText}
                </button>
              </div>
              <div className="mission-start-btn-cmd-stop">
                <NavLink to="/">
                    <div className="mission-start-btn-cmd-stop-btn" >
                        <button onClick={handleStop} className="mission-start-btn-cmd-stop-btn" style={{ border: "none" }}>
                            <img src={StopButton} alt="Icon stop" className="mission-start-btn-cmd-stop-btn-img" />
                            {t("Stop mission")}
                        </button>
                    </div>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="mission-start-progres-end">100%</div>
        </div>
      </div>
    </>
  );
}

export default MissionContent;
