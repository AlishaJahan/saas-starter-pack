import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Rocket className="text-primary-500 w-8 h-8" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
              SAAS Starter
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#features" className="hover:text-primary-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary-400 transition-colors">Pricing</a>
            <a href="#about" className="hover:text-primary-400 transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              Log in
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
