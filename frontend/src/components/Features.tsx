import { motion } from 'framer-motion';
import { Shield, Zap, CreditCard, Users, Code, LineChart } from 'lucide-react';

const features = [
  {
    title: 'Secure Auth',
    description: 'Pre-configured authentication with JWT and multi-factor support.',
    icon: Shield,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Lightning Fast',
    description: 'Built with Vite and React for ultra-fast performance and DX.',
    icon: Zap,
    color: 'bg-yellow-500/10 text-yellow-500',
  },
  {
    title: 'Stripe Billing',
    description: 'Integrated subscription management and checkout flows.',
    icon: CreditCard,
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    title: 'Team Management',
    description: 'Collaborate easily with role-based access control.',
    icon: Users,
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'Modern Stack',
    description: 'TypeScript, Tailwind, and Node.js for scalable development.',
    icon: Code,
    color: 'bg-orange-500/10 text-orange-500',
  },
  {
    title: 'Analytics',
    description: 'Deep insights into user behavior and business metrics.',
    icon: LineChart,
    color: 'bg-rose-500/10 text-rose-500',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary-500 font-bold tracking-wider uppercase text-sm mb-4">Features</h2>
          <p className="text-3xl lg:text-5xl font-bold mb-6">Everything you need to succeed</p>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Stop wasting weeks on boilerplate. Focus on your unique product features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
