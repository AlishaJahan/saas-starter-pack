import { motion } from 'framer-motion';
import { UserPlus, Mail, Shield } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

const Team = () => {
  const { t } = useTranslation();
  const members = [
    { name: 'John Doe', role: 'Admin', email: 'john@example.com', status: 'Active' },
    { name: 'Alice Smith', role: 'Designer', email: 'alice@example.com', status: 'Active' },
    { name: 'Bob Wilson', role: 'Developer', email: 'bob@example.com', status: 'Away' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white flex transition-colors">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('Team Members') || 'Team Members'}</h1>
              <p className="text-neutral-500 dark:text-neutral-400">Manage your organization's team and permissions.</p>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
              <UserPlus className="w-5 h-5" />
              Invite Member
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {members.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group hover:border-primary-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-lg text-primary-500">
                    {member.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold">{member.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {member.email}</span>
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {member.role}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {member.status}
                  </span>
                  <button className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">{t('Manage') || 'Manage'}</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
