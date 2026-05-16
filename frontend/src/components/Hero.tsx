import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            New: Version 2.0 is out
            <ChevronRight className="w-3 h-3" />
          </span>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Launch Your Next <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-purple-400 to-indigo-400">
              Big Idea Faster
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The ultimate SAAS starter pack with everything you need to build, launch, and scale. 
            Authentication, Billing, and beautiful UI included out of the box.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-600/20"
              >
                Start Building Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <a href="#pricing" className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 rounded-xl font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all border border-neutral-800">
                View Demo
              </button>
            </a>

          </div>
        </motion.div>

        {/* Hero Image Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative group"
        >
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-purple-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
             <div className="bg-neutral-900 rounded-xl aspect-[16/9] flex items-center justify-center border border-neutral-800 overflow-hidden">
                <img 
                  src="/images/dashboard-preview.png" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 pointer-events-none" />
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
