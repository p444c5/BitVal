import React from 'react';
import { ArrowDown, Clock, User, Gift } from 'lucide-react';
import type { Pair } from '@/types';
interface PairCardProps {
    pair: Pair;
}

const PairCard: React.FC<PairCardProps> = ({ pair }) => {
    return (
        <div className="bg-gray-800/20 border border-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:border-rose-500/30 transition-all duration-300 h-full group relative overflow-hidden">
            
            <div className="flex flex-col items-center h-full">

                {/* SENDER*/}
                <div className="w-full flex flex-col items-center">
                    <p className="text-xs text-gray-500 text-center mb-2 uppercase tracking-wide font-medium">From</p>
                    <div className=" w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center text-rose-500 font-bold group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300 mb-2">
                            <User className="w-6 h-6" />
                    </div>
                    <p className="font-semibold text-gray-200 text-sm group-hover:text-white transition-colors text-center truncate w-full px-2">
                        {pair.from}
                    </p>
                </div>

                <div className="relative w-full flex flex-col items-center justify-center py-4 flex-1">
                    {/* Vertical Line */}
                    <div className="absolute h-full w-px bg-linear-to-b from-gray-800 via-rose-500/30 to-gray-800 group-hover:via-rose-500/60 transition-colors"></div>
                    
                    {/* The Gift Amount Badge */}
                    <div className="relative z-10 bg-gray-900 border border-gray-700 group-hover:border-rose-500/50 rounded-xl px-4 py-2 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-rose-900/20">
                        <div className="flex items-center gap-2">
                             <Gift className="w-3.5 h-3.5 text-rose-500" />
                             <p className="text-rose-400 font-bold text-lg font-mono tracking-tight">
                                ${pair.fromValue}BTC
                            </p>
                        </div>
                    </div>

                     <div className="absolute bottom-0 p-1.5 bg-gray-900 rounded-full border border-gray-800 group-hover:border-rose-500/30 text-gray-500 group-hover:text-rose-400 transition-colors translate-y-1/2 z-10">
                        <ArrowDown className="w-4 h-4" />
                    </div>
                </div>

               
                <div className="w-full flex flex-col items-center mt-4">
                     <p className="text-xs text-gray-500 text-center mb-2 uppercase tracking-wide font-medium">To</p>
                    <div className=" w-12 h-12 bg-emerald-500/10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 font-bold group-hover:border-gray-600 transition-colors duration-300 mb-2">
                            <User className="w-6 h-6 text-emerald-500" />
                    </div>
                    <p className="font-semibold text-gray-200 text-sm group-hover:text-white transition-colors text-center truncate w-full px-2">
                        {pair.to}
                    </p>
                </div>

                {/* Footer Timestamp */}
                <div className="w-full border-t border-gray-900 pt-3 mt-6">
                    <div className="flex items-center justify-center space-x-1.5 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{pair.timestamp}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PairCard;