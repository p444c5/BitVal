import { Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-linear-to-r from-transparent via-rose-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-1.5 bg-rose-500/10 rounded-lg">
                <Gift className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">BitVal</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Redefining digital gifting. Connect deeply, exchange freely, and celebrate love on the blockchain.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="font-semibold text-white mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-rose-400 transition-colors">Home</Link></li>
                <li><Link to="/pairs" className="hover:text-rose-400 transition-colors">Active Exchanges</Link></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Leaderboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-rose-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2026 BitVal. Created with <span className="text-rose-500 animate-pulse">❤</span> for the future of Bitcointalk.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;