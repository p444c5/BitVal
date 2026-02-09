import React from 'react';
import { Upload, Plus, Trash2, Edit2 } from 'lucide-react';
import { useParticipantsManager } from '@/hooks/admin/useParticipantsManager';
import NewParticipantModal from '@/components/ui/admin/NewParticipantModal';

const ParticipantsManager: React.FC = () => {
    const {
        rawParticipants,
        uploading,
        file,
        isModalOpen,
        formData,
        handleFileChange,
        handleBulkUpload,
        openModal,
        closeModal,
        handleInputChange,
        handleNewParticipantSubmit
    } = useParticipantsManager();

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Participants</h1>
                    <p className="text-gray-400 text-sm">Manage entries and verified wallets.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={openModal}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Add New</span>
                    </button>
                    {/* CSV Upload Trigger */}
                    <label className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors cursor-pointer shadow-lg shadow-rose-900/20">
                        {uploading ? <span className="animate-spin mr-2">⟳</span> : <Upload className="w-4 h-4" />}
                        <span className="text-sm">{uploading ? 'Uploading...' : 'Bulk Upload (CSV)'}</span>
                        <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
                    </label>
                    {file && (
                        <button onClick={handleBulkUpload} className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded">
                            Confirm Upload {file.name}
                        </button>
                    )}
                </div>
            </div>

            {/* Participants Table */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-900/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Deposit (BTC)</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Wallet</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {rawParticipants.map((p) => (
                                <tr key={p._id} className="group hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-white">{p.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">{p.deposit.toFixed(8)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{p.walletAddress.substring(0, 8)}...{p.walletAddress.slice(-6)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full border ${p.status === 'matched' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                p.isPaired ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-gray-700/30 text-gray-400 border-gray-600/30'
                                            }`}>
                                            {p.status || (p.isPaired ? 'Paired' : 'Active')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {rawParticipants.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No participants found. Add some or upload a CSV.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add New Participant Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <NewParticipantModal
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleNewParticipantSubmit={handleNewParticipantSubmit}
                        closeModal={closeModal}
                    />
                </div>
            )}
        </div>
    );
};

export default ParticipantsManager;
