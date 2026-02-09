import React from 'react';
import { Users, Bitcoin, Shuffle, Activity } from 'lucide-react';
import { useParticipantsContext } from '@/context/ParticipantContext';
import StatCard from '@/components/ui/admin/StatCard';



const DashboardPage: React.FC = () => {
    const { count, pool, loading } = useParticipantsContext(); // will bechanged later to fetch additonal admin stats later
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back, here's what's happening with BitVal 2026.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    icon={Users} 
                    title="Total Participants" 
                    value={loading ? "..." : count} 
                    subtext="Verified entries in pool"
                    color="blue"
                />
                <StatCard 
                    icon={Bitcoin} 
                    title="Total Pool Value" 
                    value={loading ? "..." : `${pool?.toFixed(8) || "0.00"}BTC`}
                    subtext="Combined deposit value"
                    color="yellow"
                />
                <StatCard 
                    icon={Shuffle} 
                    title="Pairing Status" 
                    value="Pending" 
                    subtext="Scheduled for Feb 11"
                    color="purple"
                />
                 <StatCard 
                    icon={Activity} 
                    title="System Status" 
                    value="Active" 
                    subtext="All systems operational"
                    color="emerald"
                />
            </div>

            {/* Recent Activity / Quick Actions Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Registration Activity</h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-800 rounded-xl text-gray-600">
                        Chart/Graph Placeholder
                    </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors text-sm font-medium flex items-center justify-between group">
                            Upload Participants
                            <span className="text-gray-500 group-hover:text-white">→</span>
                        </button>
                        <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors text-sm font-medium flex items-center justify-between group">
                            Manage Admins
                            <span className="text-gray-500 group-hover:text-white">→</span>
                        </button>
                        <button className="w-full py-3 px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-colors text-sm font-medium flex items-center justify-between">
                            Generate Pairs (Dry Run)
                            <span>comming soon!</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
