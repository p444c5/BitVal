import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '@/services/auth.service';
import { Lock, User } from 'lucide-react';
import { Toaster } from 'sonner';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const isSuccess = await adminLogin(username, password);

        if (isSuccess) {
            navigate('/admin/dashboard');
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
               <Toaster position="top-right" richColors />
             {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-md bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                        Bit<span className="text-rose-500">Val</span> Admin
                    </h1>
                    <p className="text-gray-400 text-sm">Sign in to manage the event</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500 transition-colors"
                                placeholder="adminUser"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                         <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-rose-500 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-rose-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;