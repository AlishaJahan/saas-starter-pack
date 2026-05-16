import { motion } from 'framer-motion';
import { Target, Zap, Shield, Users } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Developers', value: '10k+' },
    { label: 'Products Launched', value: '500+' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Countries', value: '40+' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      desc: 'To empower developers to build and launch world-class software at lightning speed.',
    },
    {
      icon: Zap,
      title: 'Performance',
      desc: 'Optimized for speed and efficiency, ensuring your users get the best experience possible.',
    },
    {
      icon: Shield,
      title: 'Security',
      desc: 'Enterprise-grade security built into every layer of our boilerplate.',
    },
    {
      icon: Users,
      title: 'Community',
      desc: 'A thriving ecosystem of developers sharing knowledge and building together.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
              Building the Future of <br />
              <span className="text-primary-500">SaaS Development</span>
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-10 leading-relaxed">
              We started with a simple goal: to eliminate the repetitive work of setting up new projects. 
              Today, SAAS Starter is the most advanced boilerplate used by thousands of developers 
              to launch their ideas in record time.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value, i) => (
              <div 
                key={i}
                className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
