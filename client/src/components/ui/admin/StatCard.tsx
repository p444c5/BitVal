import React from 'react';

const StatCard : React.FC<{ icon: React.ElementType, title: string, value: string | number, subtext: string, color: string }> = ({ icon: Icon, title, value, subtext, color }) => (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-${color}-500/10`}>
                <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
            {/* <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span> */}
        </div>
        <div>
            <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-gray-500 text-xs">{subtext}</p>
        </div>
    </div>
);1
export default StatCard;