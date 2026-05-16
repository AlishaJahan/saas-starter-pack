import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Rocket, 
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const stats = [
    { label: t('Total Projects'), value: '12', change: '+2', icon: Rocket },
    { label: t('Team Members'), value: '4', change: '0', icon: Users },
    { label: t('Active Tasks'), value: '28', change: '+5', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white flex transition-colors">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-8 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md sticky top-0 z-20">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder={t('Search anything')}
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-primary-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white dark:border-neutral-950" />
            </button>
            <div className="flex items-center gap-3 border-l border-neutral-200 dark:border-neutral-800 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{userInfo.name || 'User'}</p>
                <p className="text-xs text-neutral-500">{userInfo.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {userInfo.name?.[0] || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('Welcome back')}, {userInfo.name?.split(' ')[0]}!</h1>
            <p className="text-neutral-500 dark:text-neutral-400">Here's what's happening with your projects today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative overflow-hidden group shadow-sm"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                  <stat.icon className="w-16 h-16" />
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-4">
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <span className="text-emerald-500 text-xs font-bold">{stat.change} this week</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm">
              <h3 className="text-xl font-bold mb-6">{t('Recent Activity')}</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500">
                        <Rocket className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">New project "AI SaaS" created</p>
                        <p className="text-xs text-neutral-500">2 hours ago</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-600" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4">
                <LayoutDashboard className="w-8 h-8 text-neutral-600" />
              </div>
              <h4 className="text-lg font-bold mb-2">No active projects</h4>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs mb-6">Start by creating your first project to see analytics and more.</p>
              <button className="bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold text-sm hover:opacity-80 transition-all">
                Create New Project
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
