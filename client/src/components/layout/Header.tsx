import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            {/* <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 group-hover:border-rose-500/50 transition-colors">
              <Gift className="w-5 h-5 text-white" />
            </div> */}
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Bit<span className="text-rose-500 text-3xl">Val</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
             <Link to="/" className="text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900 transition-colors px-3 py-2 rounded-lg">
              Home
            </Link>
            <Link to="/participants" className="text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900 transition-colors px-3 py-2 rounded-lg">
              Participants
            </Link>
            <Link to="/pairs" className="text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900 transition-colors px-3 py-2 rounded-lg">
              Pairs
            </Link>
            <button className="bg-rose-700/80 text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-rose-500 transition-colors shadow-lg shadow-rose-900/20">
              Join Pool
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800">
          <div className="px-4 py-6 space-y-4">
            <Link 
              to="/" 
              className="block text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
             <Link 
              to="/participants" 
              className="block text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Participants
            </Link>
            <Link 
              to="/pairs" 
              className="block text-base font-medium text-gray-400 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pairs
            </Link>
            <button className="w-full mt-4 bg-rose-700/80 text-white font-bold py-3 rounded-lg hover:bg-rose-500 transition-colors">
              Join Pool
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;