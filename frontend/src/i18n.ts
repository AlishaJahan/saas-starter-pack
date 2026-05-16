import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  English: {
    translation: {
      "Dashboard": "Dashboard",
      "Team": "Team",
      "Settings": "Settings",
      "Admin Panel": "Admin Panel",
      "Logout": "Logout",
      "Welcome back": "Welcome back",
      "Recent Activity": "Recent Activity",
      "Total Projects": "Total Projects",
      "Team Members": "Team Members",
      "Active Tasks": "Active Tasks",
      "Edit": "Edit",
      "Profile": "Profile",
      "Security": "Security",
      "Notifications": "Notifications",
      "Language": "Language",
      "Appearance": "Appearance",
      "Theme": "Theme",
      "Save Changes": "Save Changes",
      "Update Password": "Update Password",
      "Search anything": "Search anything...",
      "Manage your account": "Manage your account and preferences.",
      "Profile Description": "Manage your public information and avatar",
      "Security Description": "Password, 2FA and login activity",
      "Notifications Description": "Configure how you want to be alerted",
    }
  },
  Hindi: {
    translation: {
      "Dashboard": "डैशबोर्ड",
      "Team": "टीम",
      "Settings": "सेटिंग्स",
      "Admin Panel": "एडमिन पैनल",
      "Logout": "लॉगआउट",
      "Welcome back": "आपका स्वागत है",
      "Recent Activity": "हाल की गतिविधि",
      "Total Projects": "कुल प्रोजेक्ट्स",
      "Team Members": "टीम के सदस्य",
      "Active Tasks": "सक्रिय कार्य",
      "Edit": "संपादन करें",
      "Profile": "प्रोफ़ाइल",
      "Security": "सुरक्षा",
      "Notifications": "सूचनाएं",
      "Language": "भाषा",
      "Appearance": "दिखावट",
      "Theme": "थीम",
      "Save Changes": "बदलाव सहेजें",
      "Update Password": "पासवर्ड अपडेट करें",
      "Search anything": "कुछ भी खोजें...",
      "Manage your account": "अपने खाते और प्राथमिकताओं को प्रबंधित करें।",
      "Profile Description": "अपनी सार्वजनिक जानकारी और अवतार प्रबंधित करें",
      "Security Description": "पासवर्ड, 2FA और लॉगिन गतिविधि",
      "Notifications Description": "कॉन्फ़िगर करें कि आप कैसे सतर्क रहना चाहते हैं",
    }
  },
  Spanish: {
    translation: {
      "Dashboard": "Panel",
      "Team": "Equipo",
      "Settings": "Ajustes",
      "Admin Panel": "Panel de Admin",
      "Logout": "Cerrar sesión",
      "Welcome back": "Bienvenido de nuevo",
      "Recent Activity": "Actividad reciente",
    }
  },
  French: {
    translation: {
      "Dashboard": "Tableau de bord",
      "Team": "Équipe",
      "Settings": "Paramètres",
      "Admin Panel": "Panneau d'administration",
      "Logout": "Se déconnecter",
      "Welcome back": "Bon retour",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'English',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
