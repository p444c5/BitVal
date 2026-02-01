import React from 'react';
import { Users, Gift, TrendingUp } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: number | string;
    icon: React.ReactNode;
    bgColor: string;
    iconBgColor: string;
    iconColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, bgColor, iconBgColor, iconColor }) => {
    return (
        <div className={`${bgColor} border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium">{label}</p>
                    <p className="text-3xl font-bold text-white mt-1">{value}</p>
                </div>
                <div className={`${iconBgColor} p-4 rounded-full border border-opacity-30`}>
                    <div className={`${iconColor}`}>
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface StatsProps {
    totalParticipants: number;
    totalValue: number;
    recentExchanges: number;
}

const Stats: React.FC<StatsProps> = ({ totalParticipants, totalValue, recentExchanges }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatsCard
                label="Active Participants"
                value={totalParticipants}
                icon={<Users className="w-8 h-8" />}
                bgColor="bg-gray-800/50 hover:shadow-pink-500/20"
                iconBgColor="bg-pink-500/20"
                iconColor="text-pink-400"
            />
            <StatsCard
                label="Total Pool Value"
                value={`$${totalValue}`}
                icon={<Gift className="w-8 h-8" />}
                bgColor="bg-gray-800/50 hover:shadow-purple-500/20"
                iconBgColor="bg-purple-500/20"
                iconColor="text-purple-400"
            />
            <StatsCard
                label="Recent Exchanges"
                value={recentExchanges}
                icon={<TrendingUp className="w-8 h-8" />}
                bgColor="bg-gray-800/50 hover:shadow-blue-500/20"
                iconBgColor="bg-blue-500/20"
                iconColor="text-blue-400"
            />
        </div>
    );
};

export default Stats;
