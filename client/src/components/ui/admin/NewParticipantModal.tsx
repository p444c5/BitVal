
import React from "react";
import { X, User, DollarSign, Wallet } from "lucide-react";

const NewParticipantModal: React.FC<{
    formData: { name: string; deposit: string; walletAddress: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNewParticipantSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    closeModal: () => void;
}> = ({ formData, handleInputChange, handleNewParticipantSubmit, closeModal }) => {
    return (
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
            <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">Add Participant</h2>
            <p className="text-sm text-gray-400 mb-6">Enter details manually.</p>

            <form onSubmit={handleNewParticipantSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all text-sm"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Deposit Amount (BTC)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <input
                            type="number"
                            name="deposit"
                            step="0.00000001"
                            value={formData.deposit}
                            onChange={handleInputChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all text-sm"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Wallet Address</label>
                    <div className="relative">
                        <Wallet className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            name="walletAddress"
                            value={formData.walletAddress}
                            onChange={handleInputChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all text-sm font-mono"
                            placeholder="bc1q..."
                        />
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white  rounded-lg transition-colors text-sm font-medium shadow-lg shadow-rose-900/20">
                        Confirm Add
                    </button>
                </div>
            </form>
        </div>

    );
};

export default NewParticipantModal;