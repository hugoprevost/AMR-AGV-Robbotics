import React from 'react'
import './erreur-drop.scss'
import GoTo from '../../assets/img/GoTo.svg';


function ErreurDrop({ code, infos, nom, accroche, description }) {

    return(
        <div className="collapse-erreur" id={`collapse__${nom}`} >
            <div className="collapse-erreur-content">
                <div className='erreur-cros'>
                    <img src={ infos } alt='Icon status' className='erreur-cros-img'/>
                </div>
                <div className='erreur-list'>
                    <div className='collapse-erreur-content-block'>
                        <div className="collapse-erreur-content-titre">{nom}</div>
                        <div className="collapse-erreur-content-code">{code}</div>
                    </div>
                    <div>
                        <div className="collapse-erreur-content-accroche">{accroche}</div>
                        <div className="collapse-erreur-content-description">{description}</div>
                    </div>
                </div>
                <div className='erreur-arrow'>
                    <img src={ GoTo } alt='Arrow'/>
                </div>
            </div>
        </div>
    )
}
export default ErreurDrop;