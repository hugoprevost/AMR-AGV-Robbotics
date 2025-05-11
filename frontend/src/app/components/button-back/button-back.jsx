import React from 'react';
import { useTranslation } from 'react-i18next';
import './button-back.scss';

import back from '../../assets/img/back-chevron.svg';
  
function ButtonBack(){

    const { t } = useTranslation();

    return (
        <>
            <button className='back-button-content'>
                <img src={ back } alt='Retour button'/>
                {t('Retour')}
            </button>
        </>
    )
}
  
export default ButtonBack;