import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Rocket, 
  Bell,
  Search,
  ChevronRight,
  Plus,
  X,
  Loader2,
  FolderOpen,
  CheckCircle2,
  AlertCircle,
  Info,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

const Dashboard = () => {
  const { t } = useTranslation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const [projects, setProjects] = useState<Project[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [creating, setCreating] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjects();
    fetchNotifications();
    
    // Close notification dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/projects', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/notifications', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setCreating(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/projects', {
        name: projectName,
        description: projectDesc,
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setProjects([data, ...projects]);
      setIsModalOpen(false);
      setProjectName('');
      setProjectDesc('');
      
      // Refresh notifications to show "Project Created"
      setTimeout(fetchNotifications, 500);
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setCreating(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const stats = [
    { label: t('Total Projects'), value: projects.length.toString(), change: '+2', icon: Rocket },
    { label: t('Team Members'), value: '4', change: '0', icon: Users },
    { label: t('Active Tasks'), value: '28', change: '+5', icon: LayoutDashboard },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white flex transition-colors overflow-x-hidden">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
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
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all"
              >
                <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'animate-bounce' : ''}`} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-950">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center bg-neutral-50/50 dark:bg-neutral-900/50">
                      <h3 className="font-bold text-sm">Notifications</h3>
                      <button className="text-xs text-primary-500 font-bold hover:underline">Mark all as read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => markAsRead(notif.id)}
                            className={`p-4 border-b border-neutral-50 dark:border-neutral-800/50 cursor-pointer transition-colors ${!notif.read ? 'bg-primary-500/5 dark:bg-primary-500/10' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/30'}`}
                          >
                            <div className="flex gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                                notif.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                                'bg-primary-500/10 text-primary-500'
                              }`}>
                                {notif.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                                 notif.type === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                                 <Info className="w-4 h-4" />}
                              </div>
                              <div>
                                <p className={`text-xs font-bold ${!notif.read ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                  {notif.title}
                                </p>
                                <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">
                                  {notif.message}
                                </p>
                                <p className="text-[10px] text-neutral-400 mt-2 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="w-8 h-8 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
                          <p className="text-sm text-neutral-500">No new notifications</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('Welcome back')}, {userInfo.name?.split(' ')[0]}!</h1>
              <p className="text-neutral-500 dark:text-neutral-400">Here's what's happening with your projects today.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary-600/20"
            >
              <Plus className="w-4 h-4" />
              {t('New Project')}
            </button>
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
            {/* Recent Activity / Projects List */}
            <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm">
              <h3 className="text-xl font-bold mb-6">{projects.length > 0 ? t('Your Projects') : t('Recent Activity')}</h3>
              <div className="space-y-6">
                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                  </div>
                ) : projects.length > 0 ? (
                  projects.slice(0, 5).map((project) => (
                    <motion.div 
                      key={project.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800/50 hover:border-primary-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
                          <Rocket className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{project.name}</p>
                          <p className="text-xs text-neutral-500 line-clamp-1">{project.description || 'No description'}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                    </motion.div>
                  ))
                ) : (
                  [1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800/50 opacity-50">
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
                  ))
                )}
              </div>
            </div>

            {/* Empty State or Quick Stats */}
            <div className={`p-8 rounded-3xl border border-dashed ${projects.length === 0 ? 'border-neutral-300 dark:border-neutral-800' : 'border-neutral-200 dark:border-neutral-800'} flex flex-col items-center justify-center text-center`}>
              {projects.length === 0 ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4">
                    <LayoutDashboard className="w-8 h-8 text-neutral-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">No active projects</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs mb-6">Start by creating your first project to see analytics and more.</p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold text-sm hover:opacity-80 transition-all shadow-xl"
                  >
                    {t('Create New Project')}
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                   <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-600/20 flex items-center justify-center mb-6">
                      <FolderOpen className="w-10 h-10 text-primary-500" />
                   </div>
                   <h4 className="text-xl font-bold mb-2">Project Overview</h4>
                   <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs mb-8">You have {projects.length} active projects. Keep up the great work!</p>
                   <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-left">
                        <p className="text-xs text-neutral-500 mb-1">Weekly Growth</p>
                        <p className="text-lg font-bold text-emerald-500">+12%</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-left">
                        <p className="text-xs text-neutral-500 mb-1">Efficiency</p>
                        <p className="text-lg font-bold text-purple-500">94%</p>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Create Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                      <Plus className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">{t('Create New Project')}</h2>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>

                <form onSubmit={handleCreateProject} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Project Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. My Awesome SaaS"
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 outline-none focus:border-primary-500 transition-all"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Description (Optional)</label>
                    <textarea 
                      rows={4}
                      placeholder="What is this project about?"
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 outline-none focus:border-primary-500 transition-all resize-none"
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 rounded-xl font-bold border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={creating || !projectName.trim()}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2"
                    >
                      {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Project'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;


