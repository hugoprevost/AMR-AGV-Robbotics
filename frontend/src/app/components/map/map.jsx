import React, { useState, useEffect } from 'react';
import Modal from '../modal/modal'
import axios from 'axios';
import './map.scss';
import Carto from '../../assets/img/map.jpg';
import SherpaD from '../../assets/img/sherpaD.png'
import SherpaB from '../../assets/img/sherpaB.png'
import SherpaP from '../../assets/img/sherpaP.png'
import SherpaF from '../../assets/img/sherpaF.png'
  
function Map(){
    const [modalOpen, setModalOpen] = useState(false);
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

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className='map' onClick={openModal} style={{backgroundImage:`url(${Carto})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
                <img src={ renderImage() } alt='Map' className='map-img-robot'/>
            </div>
            <Modal isOpen={modalOpen} onClose={closeModal}> 
                <img src={ renderImage() } alt='Sherpa' className='map-img-robot-modal'/>
                <img src={Carto} alt="Map" className='map-img-modal' />
            </Modal>
            
        </>
    )
}
  
export default Map;