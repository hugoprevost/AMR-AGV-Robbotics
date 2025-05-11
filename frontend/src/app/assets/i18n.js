// const fetchLanguage = async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/options/lock/langue'); // 🔹 Remplace par ton URL backend
//     return response.data.langue || 'fr'; // 🔹 Utilise 'fr' par défaut si rien n'est trouvé
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la langue:', error);
//     return 'fr'; // 🔹 En cas d'erreur, on utilise 'fr' par défaut
//   }
// };

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translate/en.json';
import frTranslations from './translate/fr.json';
import deTranslations from './translate/de.json';
import esTranslations from './translate/es.json';
import ptTranslations from './translate/pt.json';
import plTranslations from './translate/pl.json';
import itTranslations from './translate/it.json';

// Initialisation de i18n avec le changement de langue
const fetchLanguage = async () => {
  try {
    const response = await fetch('http://localhost:5000/options/lock/langue');
    const data = await response.json();
    return data.langue || 'fr'; // Langue par défaut si non spécifiée
  } catch (error) {
    console.error('Erreur lors de la récupération de la langue:', error);
    return 'fr'; // Langue par défaut en cas d'erreur
  }
};

// Initialisation de i18n avec le changement de langue
const initializeI18n = async () => {
  const language = await fetchLanguage(); // Attend la récupération de la langue depuis le backend

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
      de: { translation: deTranslations },
      es: { translation: esTranslations },
      pt: { translation: ptTranslations },
      pl: { translation: plTranslations },
      it: { translation: itTranslations },
    },
    lng: language, // Langue récupérée ou par défaut
    fallbackLng: 'fr',
    interpolation: { escapeValue: false }, // Empêche l'échappement HTML
  });
};

// Appel de l'initialisation au démarrage de l'application
initializeI18n();

export default i18n;



// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import enTranslations from './translate/en.json';
// import frTranslations from './translate/fr.json';
// import deTranslations from './translate/de.json';
// import esTranslations from './translate/es.json';
// import ptTranslations from './translate/pt.json';
// import plTranslations from './translate/pl.json';
// import itTranslations from './translate/it.json';

// const fetchLanguageFromBackend = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/options/lock/langue');
//     const data = await response.json();
//     return typeof data.langue === 'string' ? data.langue : 'fr'; // Toujours une string
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la langue:', error);
//     return 'fr'; // Valeur de secours
//   }
// };


// fetchLanguageFromBackend().then((lang) => {
//   console.log("Langue récupérée du backend :", lang);
//   i18n
//     .use(initReactI18next)
//     .init({
//       resources: {
//         en: { translation: enTranslations },
//         fr: { translation: frTranslations },
//         de: { translation: deTranslations },
//         es: { translation: esTranslations },
//         pt: { translation: ptTranslations },
//         pl: { translation: plTranslations },
//         it: { translation: itTranslations },
//       },
//       lng: lang || 'fr', // Sécurisation de la langue
//       fallbackLng: 'fr',
//       interpolation: { escapeValue: false },
//     })
//     .catch((error) => console.error('Erreur lors de l\'initialisation de i18n:', error));
// });

// export default i18n;

// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import { useLanguage } from "./LanguageContext";
// import enTranslations from './translate/en.json';
// import frTranslations from './translate/fr.json';
// import deTranslations from './translate/de.json';
// import esTranslations from './translate/es.json';
// import ptTranslations from './translate/pt.json';
// import plTranslations from './translate/pl.json';
// import itTranslations from './translate/it.json';

// const { language } = useLanguage(); 

// i18n.use(initReactI18next).init({
//     resources: {
//       en: { translation: enTranslations },
//       fr: { translation: frTranslations },
//       de: { translation: deTranslations },
//       es: { translation: esTranslations },
//       pt: { translation: ptTranslations },
//       pl: { translation: plTranslations },
//       it: { translation: itTranslations },
//     },
//     lng: language,
//     fallbackLng: "en",
//     interpolation: { escapeValue: false },
// });

// export default i18n;