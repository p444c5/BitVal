import React from "react";
import { Check, Copy, User } from "lucide-react";
import type { UIParticipantGridProps } from "@/types";
import { toTitleCase } from "@/utils";

const ParticipantGrid: React.FC<UIParticipantGridProps> = ({
    participants,
    getStatusColor,
    getStatusLabel,
    truncateAddress,
    copyToClipboard,
    copiedId
}) => {
    return (
        <div className="mb-6">
            <div className="relative bg-gray-800/30 border border-gray-800 rounded-t-2xl shadow-lg overflow-hidden group/list">
                <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(150vh-400px)] overflow-y-auto pr-4 scroll-smooth p-6 scrollbar-hide"
                >
                    {participants.map((participant) => (
                        <div
                            key={participant?.id}
                            className="bg-gray-800/20 border border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-rose-500/30 transition-all duration-300 group"
                        >
                            {/* Participant Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3 flex-1">
                                    <div className="w-12 h-12 bg-pink-500/10 border border-rose-500/20 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                                        <User className="w-6 h-6 text-rose-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-white truncate group-hover:text-rose-200 transition-colors">
                                            {toTitleCase(participant?.name)}
                                        </h3>
                                        <p className="text-xs text-gray-500">{participant?.joinedDate}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ml-2 shrink-0 ${getStatusColor(participant?.status ?? '')}`}>
                                    {getStatusLabel(participant?.status ?? '')}
                                </span>
                            </div>

                            {/* Wallet Address */}
                            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4 group-hover:border-gray-700 transition-colors">
                                <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Wallet Address</p>
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-mono text-gray-300 truncate group-hover:text-rose-400 transition-colors">
                                        {truncateAddress(participant?.walletAddress)}
                                    </p>
                                    <button
                                        onClick={() => copyToClipboard(participant?.walletAddress, participant?.id)}
                                        className="p-1.5 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors shrink-0"
                                        title="Copy full address"
                                    >
                                        {copiedId === participant?.id ? (
                                            <Check className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Gift Value */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-900 group-hover:border-gray-800 transition-colors">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Gift Value</p>
                                    <p className="text-2xl font-bold text-white">{participant?.giftValue}BTC</p>
                                </div>   
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Fade Overlay to indicate scrolling */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-gray-950 via-gray-950/60 to-transparent pointer-events-none z-10" />
            </div>
        </div>
    );
};

export default ParticipantGrid;