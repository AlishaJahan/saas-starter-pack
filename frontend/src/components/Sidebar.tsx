import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Rocket, 
  ShieldCheck
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const menuItems = [
    { name: t('Dashboard'), icon: LayoutDashboard, path: '/dashboard' },
    { name: t('Team'), icon: Users, path: '/team' },
    { name: t('Settings'), icon: Settings, path: '/settings' },
  ];

  if (userInfo.role === 'ADMIN') {
    menuItems.push({ name: t('Admin Panel'), icon: ShieldCheck, path: '/admin' });
  }

  return (
    <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hidden lg:flex flex-col h-screen sticky top-0 transition-colors">
      <div className="p-6 flex items-center gap-2">
        <Rocket className="text-primary-500 w-8 h-8" />
        <span className="text-xl font-bold text-neutral-900 dark:text-white">SAAS Starter</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              location.pathname === item.path
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          {t('Logout')}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
