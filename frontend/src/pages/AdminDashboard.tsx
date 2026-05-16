import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Users, Database, Trash2, UserCog, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/admin/users', config);
      setUsers(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      setActionLoading(id);
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, config);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleRole = async (user: User) => {
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      setActionLoading(user.id);
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`http://localhost:5000/api/admin/users/${user.id}/role`, { role: newRole }, config);
      setUsers(users.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update role');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white flex transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="absolute inset-0 bg-primary-600/5 blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto relative z-10 w-full"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-600/20 rounded-2xl border border-primary-500/20">
                <ShieldCheck className="w-8 h-8 text-primary-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('Admin Central') || 'Admin Central'}</h1>
                <p className="text-neutral-500 dark:text-neutral-400">Manage your users and system configuration</p>
              </div>
            </div>
            <button 
              onClick={fetchUsers}
              className="px-6 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-sm font-medium shadow-sm"
            >
              Refresh Data
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Users, label: t('Total Users') || 'Total Users', value: users.length, color: 'text-blue-500' },
              { icon: ShieldCheck, label: t('Admins') || 'Admins', value: users.filter(u => u.role === 'ADMIN').length, color: 'text-primary-500' },
              { icon: Database, label: 'Active Sessions', value: 'Live', color: 'text-green-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-6 rounded-3xl shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          <div className="bg-white dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h2 className="text-xl font-bold">User Management</h2>
            </div>
            
            {loading ? (
              <div className="p-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
                <p className="text-neutral-500">Loading system data...</p>
              </div>
            ) : error ? (
              <div className="p-20 flex flex-col items-center justify-center gap-4 text-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
                <p className="text-red-500 font-medium">{error}</p>
                <button onClick={fetchUsers} className="text-primary-500 text-sm hover:underline">Try again</button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-800">
                      <th className="px-6 py-4 font-semibold">User</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Joined</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    <AnimatePresence mode='popLayout'>
                      {users.map((user) => (
                        <motion.tr 
                          key={user.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-sm text-neutral-900 dark:text-white">{user.name}</p>
                                <p className="text-neutral-500 dark:text-neutral-400 text-xs">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              user.role === 'ADMIN' 
                                ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20' 
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleToggleRole(user)}
                                disabled={actionLoading === user.id}
                                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50"
                                title="Toggle Role"
                              >
                                <UserCog className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(user.id)}
                                disabled={actionLoading === user.id}
                                className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
