import React, { useState } from 'react';
import "./mission-drop.scss";
import validate from '../../assets/img/mission/validate.svg';
import { Link } from 'react-router-dom';

function Drop({ id, nom, accroche, description, favori, openId, setOpenId }) {
    const isOpen = openId === id;
    const [isFavorited, setIsFavorited] = useState(favori);

    const toggleOpen = () => {
        setOpenId(isOpen ? null : id); 
    };

    const handleFavoritedChange = async () => {
        const updatedFavori = !isFavorited;
        setIsFavorited(updatedFavori);

        try {
            const response = await fetch(`http://localhost:5001/missions/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favori: updatedFavori }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du favori');
            }

            const data = await response.json();
            setIsFavorited(data.favori);
        } catch (error) {
            console.error('Erreur:', error);
            setIsFavorited(!updatedFavori);
        }
    };

    return (
        <div className="collapse" id={`collapse__${nom}`}>
            <div className="collapse__content" onClick={toggleOpen}>
                <div className="collapse__content__titre">{nom}</div>
                <div className="collapse__accroche">{accroche}</div>
            </div>
            {isOpen && (
                <div className="collapse__description true">
                    <div className='collapse-description-description'>
                        {description}
                    </div>
                    <div onClick={handleFavoritedChange} className='collapse-description-fav'>
                        {isFavorited ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="favorite-btn">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="unfavorite-btn">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        )}
                    </div>
                    <Link to={`/missions/${id}`}>
                        <div className='go-to-mission'>
                            <img src={validate} alt='Validate' />
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Drop;