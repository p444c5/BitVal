import React from 'react';
import { Clock, User } from 'lucide-react';
import type { UIParticipant as Participant } from '@/types';


interface RecentParticipantsProps {
    participants: Participant[];
}


const RecentParticipants: React.FC<RecentParticipantsProps> = ({ participants }) => {
    return (
      
            <div className="space-y-4 max-h-150 overflow-y-auto scrollbar-hide ">
                {participants.map((participant) => (
                    <div
                        key={participant.id}
                        className="border border-gray-700 shadow-sm rounded-xl p-4 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10 transition-all cursor-pointer backdrop-blur-sm"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 shrink-0 bg-pink-500/10 border border-rose-500/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                <User className="w-6 h-6 text-rose-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-200 group-hover:text-white capitalize transition-colors truncate">
                                    {participant?.name}
                                </h4>
                                <div className="flex items-center space-x-1 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>
                                        {new Date(participant.joinedDate).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short', 
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                              <div className="bg-gray-900 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gray-800 shrink-0 whitespace-nowrap ml-2 flex items-center justify-center">
                                <span className="text-emerald-400 font-bold font-mono text-[10px] sm:text-xs leading-none">
                                     {participant.giftValue}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );
};

export default RecentParticipants;
