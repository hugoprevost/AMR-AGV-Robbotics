import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SearchModal from '../modal/searchModal';
import './modalSearch.scss';
import Drop from '../../components/mission-drop/mission-drop';
import axios from "axios";

function ModalSearch() {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(true);
    const [query, setQuery] = useState("");
    const [missions, setMissions] = useState([]);
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5001/missions")
            .then(response => {
                setMissions(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des missions :", error);
            });
    }, []);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSearch = () => {
        closeModal();
    };

    return (
        <>
            <SearchModal isOpen={modalOpen} onClose={closeModal}> 
                <div className='content-modal-search'>
                    <div className='content-modal-search-title'>
                        {t('Rechercher une mission')}
                    </div>
                    <div className='content-modal-search-input'>
                        <input 
                            type="text" 
                            placeholder={`${t('Nom de la mission')}`} 
                            className='search-input' 
                            onChange={e => setQuery(e.target.value.toLowerCase())} 
                        />
                    </div>
                    <div className='content-modal-search-confirm' onClick={handleSearch}>
                        {t('Valider')}
                    </div>
                </div>
            </SearchModal>
            <div style={{ pointerEvents: modalOpen ? 'none' : 'auto' }}>
                {missions.filter(mission => mission.nom.toLowerCase().includes(query)).map((mission) => (
                    <div key={mission._id} className="drop-mission">
                        <Drop id={mission._id} accroche={mission.accroche} nom={mission.nom} description={mission.description} openId={openId} setOpenId={setOpenId} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ModalSearch;