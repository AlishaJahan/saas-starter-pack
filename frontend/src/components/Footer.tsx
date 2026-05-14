import { Rocket, Send, Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Rocket className="text-primary-500 w-6 h-6" />
              <span className="text-lg font-bold">SAAS Starter</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
              The only boilerplate you'll ever need. Build, launch, and scale your dream product today.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Social</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-primary-400 transition-all">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-primary-400 transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-primary-400 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs text-center">
            © 2026 SAAS ReStarter Pack. All rights reserved. Built with ❤️ for developers.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-600">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
