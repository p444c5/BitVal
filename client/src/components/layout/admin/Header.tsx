import { Bell, Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-950/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
            {/* Search (Placeholder) */}
            <div className="flex items-center gap-2 bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 w-96 opacity-50">
                <Search className="w-4 h-4 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    disabled
                    className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-600"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
                    <div className="bg-rose-500/10 p-2 rounded-full border border-rose-500/20">
                        <User className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;
