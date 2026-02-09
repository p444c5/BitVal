import React from 'react';
import { Shuffle, Gift, AlertTriangle } from 'lucide-react';
import { usePairingControl } from '@/hooks/admin/usePairingControl';

const PairingControl: React.FC = () => {
    const {
        pairingStatus,
        allocatingStatus,
        logs,
        handlePairing,
        handleAllocation
    } = usePairingControl();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                 <h1 className="text-2xl font-bold text-white">Event Controls</h1>
                 <p className="text-gray-400 text-sm">Execute core event logic securely.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pairing Card */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Shuffle className="w-32 h-32 text-amber-500" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="p-3 bg-amber-500/10 w-fit rounded-xl mb-6">
                            <Shuffle className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">1. Generate Pairs</h3>
                        <p className="text-gray-400 text-sm mb-6 h-12">
                            Shuffles verified participants and creates circular matches. No one is left without a match.
                        </p>
                        <button 
                            onClick={handlePairing}
                            disabled={pairingStatus === 'processing'}
                            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {pairingStatus === 'processing' ? 'Shuffling...' : 'Run Pairing Algorithm'}
                        </button>
                    </div>
                </div>

                {/* Allocation Card */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Gift className="w-32 h-32 text-rose-500" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="p-3 bg-rose-500/10 w-fit rounded-xl mb-6">
                            <Gift className="w-8 h-8 text-rose-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">2. Distribute Gifts</h3>
                        <p className="text-gray-400 text-sm mb-6 h-12">
                            Calculates gift values based on pool logic and updates status to 'Allocated'.
                        </p>
                        <button 
                            onClick={handleAllocation}
                             disabled={allocatingStatus === 'processing'}
                            className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                             {allocatingStatus === 'processing' ? 'Calculating...' : 'Run Allocation Logic'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Console Output */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-gray-800 pb-2">
                    <span className="text-green-500">●</span> System Output Log
                </div>
                <div className="h-40 overflow-y-auto space-y-1 text-gray-300">
                    {logs.length === 0 && <span className="text-gray-600 italic">No actions recorded yet.</span>}
                    {logs.map((log: string, i: number) => (
                        <div key={i}>{log}</div>
                    ))}
                </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                <p className="text-sm text-yellow-200/80">
                    Warning: These actions affect the production database. Ensure all participants are successfully uploaded and verified before running pairing.
                </p>
            </div>

        </div>
    );
};

export default PairingControl;
