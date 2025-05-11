import './error.scss'
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



function Error() {

  const { t } = useTranslation();

  return (
    <div className='erreur'>
      <h2 className='erreur__titre'>{t('Il semblerait que la page que vous cherchez n’existe pas')}</h2>
      <button className='erreur__soustitre'>
        <NavLink to="/">
          {t('Retour à la page principale')}
        </NavLink>
      </button>
    </div>
  )
}

export default Error