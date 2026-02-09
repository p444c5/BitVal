import { LayoutDashboard, Users, Shuffle, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Participants', path: '/admin/participants' },
    { icon: Shuffle, label: 'Pairing & Allocation', path: '/admin/pairing' },
    // { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-gray-950 border-r border-gray-800 fixed left-0 top-0 z-40">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
            Bit<span className="text-rose-500">Val</span> Admin
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
