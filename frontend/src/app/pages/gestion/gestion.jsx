import React from 'react';
import { useTranslation } from 'react-i18next';
import scrollUp from '../../assets/img/mission/scroll-up.svg';
import scrollDown from '../../assets/img/mission/scroll-down.svg';
import ErreurInfos from '../../assets/erreur.js'
import ErreurDrop from '../../components/erreur-drop/erreur-drop';
import './gestion.scss'
  
const Gestion = () => {

     const { t } = useTranslation();

    return (
        <>
            <div className='content-container-gestion'>    
                <div className='gestion-erreur'>
                   {t('Gestion des informations')}
                </div>
                <div className='gestion-erreur-block'>
                    <div className='gestion-erreur-block-liste'>    
                        {ErreurInfos.map((erreur) => {
                            return (
                                <div key={ErreurInfos.id} className="drop-mission">
                                    <ErreurDrop id={erreur.id} nom={erreur.nom} infos={erreur.infos} code={erreur.code} accroche={erreur.accroche} description={erreur.description} />
                                </div>
                            );
                        })}
                    </div>
                    <div className='gestion-erreur-block-button'>
                        <div className='gestion-erreur-block-button-up'>
                            <img src={ scrollUp } alt='Up button'/>
                        </div>
                        <div className='gestion-erreur-block-button-down'>
                            <img src={ scrollDown } alt='Down button'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default Gestion;