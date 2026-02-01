import React from "react";
import { Users } from "lucide-react";
import { useParticipantsLogic } from "@/hooks/useParticipants";
import SearchBar from "@/components/ui/SearchBar";
import ParticipantGrid from "@/components/participants/ParticipantGrid";
import Pagination from "@/components/ui/Pagination";

const AllParticipants: React.FC = () => {
    
    const {
        paginatedParticipants, filteredCount,
        currentPage, totalPages, handlePageChange,
        searchQuery, setSearchQuery,
        activeFilter, setActiveFilter,
        copiedId, copyToClipboard,
        getStatusColor, getStatusLabel,
        truncateAddress, loading,
    } = useParticipantsLogic();

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
        </div>
    );

    return (
        <>
            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
                <SearchBar 
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by name or wallet address..."
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-4 border-b border-gray-800 pb-6">
                {['all', 'active', 'matched', 'completed'].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter as any)}
                        className={`px-5 py-2 rounded-xl font-medium text-sm transition-all border ${activeFilter === filter
                            ? 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-sm'
                            : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>

            {/* Participants Grid */}
            {filteredCount > 0 && (
            <ParticipantGrid 
                participants={paginatedParticipants}
                getStatusColor={getStatusColor}
                getStatusLabel={getStatusLabel}
                truncateAddress={truncateAddress}
                copyToClipboard={copyToClipboard}
                copiedId={copiedId}
            />
            )}
            {/* Pagination */}
            {filteredCount > 0 && (
                <div className="py-8 border-t border-gray-800 flex justify-center">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {filteredCount === 0 && (
                <div className="text-center py-20 bg-gray-900/50 rounded-2xl  border-gray-800 dashed border-2">
                    <div className="bg-gray-800 p-4 rounded-full inline-block mb-4">
                        <Users className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No participants found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            )}
        </>
    )
};

export default AllParticipants;