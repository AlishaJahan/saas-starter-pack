import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for side projects and learning.',
    features: ['Up to 5 Projects', 'Basic Analytics', 'Community Support', 'Public Repos'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Everything you need to grow your business.',
    features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Private Repos', 'Team Members'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'Scale without limits and full control.',
    features: ['Custom Deployments', 'SLA Support', 'Single Sign-On (SSO)', 'White-labeling'],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-neutral-950 relative overflow-hidden">
       {/* Background Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/30 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Choose the plan that fits your stage. No hidden fees, ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border ${plan.popular ? 'border-primary-500 bg-neutral-900 ring-4 ring-primary-500/10' : 'border-neutral-800 bg-neutral-900/50'} relative flex flex-col`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-neutral-500 text-sm">/month</span>
                </div>
                <p className="text-neutral-400 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-500" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="/signup">
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                  Get Started
                </button>
              </Link>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
