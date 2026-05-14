import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Rocket, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      // Save user info to local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary-600/5 blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <Rocket className="text-primary-500 w-8 h-8" />
            <span className="text-xl font-bold">SAAS Starter</span>
          </Link>
          <h2 className="text-3xl font-bold mb-2">Create an account</h2>
          <p className="text-neutral-500 text-sm">Start your 14-day free trial today</p>
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium"
            >
              {error}
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
              <input 
                type="text"
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
              <input 
                type="email"
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
              <input 
                type="password"
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <p className="text-[10px] text-neutral-500 leading-relaxed">
            By signing up, you agree to our <a href="#" className="text-primary-500 underline">Terms of Service</a> and <a href="#" className="text-primary-500 underline">Privacy Policy</a>.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-600/20"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-neutral-500 text-sm mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-500 hover:text-primary-400 font-bold">Log in here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
