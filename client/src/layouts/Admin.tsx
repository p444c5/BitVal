import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/admin/Sidebar';
import Header from '@/components/layout/admin/Header';
import { Toaster } from 'sonner';

const AdminLayout : React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-950 flex font-sans">
            <Toaster position="top-right" richColors /> 
            <Sidebar />
            
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-6 lg:p-8 bg-gray-950 relative">
                     {/* Background Glow Effect */}
                    <div className="absolute top-0 left-0 w-full h-96 bg-rose-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                    
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
