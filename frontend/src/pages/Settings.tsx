import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Lock, User, Globe, Moon, Settings as SettingsIcon, X, 
  Loader2, CheckCircle, Smartphone, Mail, Moon as MoonIcon, 
  Sun, Check, Languages
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo') || '{}'));
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Profile State
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  
  // Security State
  const [newPassword, setNewPassword] = useState('');
  
  // Appearance State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Language State
  const [currentLang, setCurrentLang] = useState(i18n.language || 'English');
  const languages = ['English', 'Hindi', 'Spanish', 'French'];

  // Notifications State
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
    team: true
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isProfileChanged = name !== userInfo.name || email !== userInfo.email;

  // Theme effect
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isProfileChanged) return;
    
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put('http://localhost:5000/api/users/profile', { name, email }, config);
      
      const updatedInfo = { ...userInfo, ...data };
      localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
      setUserInfo(updatedInfo);
      setSuccess(true);
      setTimeout(() => {
        setActiveModal(null);
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put('http://localhost:5000/api/users/profile', { password: newPassword }, config);
      
      setSuccess(true);
      setNewPassword('');
      setTimeout(() => {
        setActiveModal(null);
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    setSuccess(true);
    setTimeout(() => {
      setActiveModal(null);
      setSuccess(false);
    }, 800);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { id: 'profile', icon: User, title: t('Profile'), desc: t('Profile Description'), action: () => setActiveModal('profile') },
    { id: 'security', icon: Lock, title: t('Security'), desc: t('Security Description'), action: () => setActiveModal('security') },
    { id: 'notifications', icon: Bell, title: t('Notifications'), desc: t('Notifications Description'), action: () => setActiveModal('notifications') },
    { id: 'language', icon: Globe, title: t('Language'), desc: `${t('Language')}: ${currentLang}`, action: () => setActiveModal('language') },
    { id: 'appearance', icon: theme === 'dark' ? MoonIcon : Sun, title: t('Appearance'), desc: `${t('Theme')}: ${theme.toUpperCase()}`, action: () => setActiveModal('appearance') },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white flex transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
              <SettingsIcon className="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t('Settings')}</h1>
              <p className="text-neutral-500 dark:text-neutral-400">{t('Manage your account')}</p>
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((section, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group hover:shadow-md dark:hover:bg-neutral-800/50 transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl group-hover:text-primary-500 transition-colors">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{section.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">{section.desc}</p>
                  </div>
                </div>
                <button 
                  onClick={section.action}
                  className="text-primary-500 font-bold text-sm hover:underline"
                >
                  {t('Edit')}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modals Container */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 relative z-10 shadow-2xl text-neutral-900 dark:text-white"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold capitalize">{activeModal.replace('-', ' ')}</h2>
                <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Profile Modal */}
              {activeModal === 'profile' && (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">{t('Full Name')}</label>
                    <input 
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">{t('Email Address')}</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || success || !isProfileChanged}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-600/20"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : success ? <CheckCircle className="w-5 h-5" /> : t('Save Changes')}
                  </button>
                </form>
              )}

              {/* Security Modal */}
              {activeModal === 'security' && (
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">{t('New Password')}</label>
                    <input 
                      type="password"
                      required
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || success || newPassword.length < 8}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : success ? <CheckCircle className="w-5 h-5" /> : t('Update Password')}
                  </button>
                </form>
              )}

              {/* Notifications Modal */}
              {activeModal === 'notifications' && (
                <div className="space-y-4">
                  {[
                    { key: 'email', title: 'Email Notifications', icon: Mail },
                    { key: 'push', title: 'Push Notifications', icon: Smartphone },
                    { key: 'updates', title: 'Product Updates', icon: Bell },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-neutral-400" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </div>
                      <button 
                        onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-neutral-800'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => setActiveModal(null)} className="w-full bg-neutral-900 dark:bg-white dark:text-black py-4 rounded-xl font-bold mt-4">Done</button>
                </div>
              )}

              {/* Language Modal */}
              {activeModal === 'language' && (
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`p-4 rounded-2xl border transition-all text-sm font-medium flex items-center justify-between ${
                        currentLang === lang 
                          ? 'border-primary-500 bg-primary-500/10 text-primary-500' 
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-primary-500/30'
                      }`}
                    >
                      {lang}
                      {currentLang === lang && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Appearance Modal */}
              {activeModal === 'appearance' && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                      theme === 'light' ? 'border-primary-500 bg-primary-500/10 text-primary-500' : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    <Sun className="w-8 h-8" />
                    <span className="font-bold">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                      theme === 'dark' ? 'border-primary-500 bg-primary-500/10 text-primary-500' : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    <MoonIcon className="w-8 h-8" />
                    <span className="font-bold">Dark</span>
                  </button>
                </div>
              )}

              {error && <p className="mt-4 text-red-500 text-xs text-center">{error}</p>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
