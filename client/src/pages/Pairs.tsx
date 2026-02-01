import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import PairCard from "@/components/ui/PairCard";
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/ui/Pagination";
import { usePairs } from '@/hooks/usePairs';
import type { Pair } from '@/types';

const Pairs: React.FC = () => {
    const {
        paginatedPairs,
        searchQuery,
        setSearchQuery,
        activeFilter,
        setActiveFilter,
        currentPage,
        totalPages,
        handlePageChange,
        getStatusColor,
        getStatusLabel,
        loading,
        filteredCount
    } = usePairs();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                <div className="mb-8 max-w-2xl mx-auto">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search by name or wallet address..."
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-6 border-b border-gray-800 pb-6">
                    {['all', 'completed', 'in-progress', 'pending'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter as any)}
                            className={`px-5 py-2 rounded-xl font-medium text-sm transition-all border ${activeFilter === filter
                                ? 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-sm'
                                : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Pair List*/}
                {filteredCount > 0 && (
                    <div className="relative bg-gray-800/30 border border-gray-800 rounded-t-2xl shadow-lg overflow-hidden group/list">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(150vh-400px)] overflow-y-auto pr-4 scroll-smooth p-6 scrollbar-hide">
                            {paginatedPairs.map((pair:Pair) => (
                                <div key={pair.id} className="relative group/card h-full">
                                    <PairCard pair={pair} />

                                    {/* Status Badges */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(pair.status)}`}>
                                            {getStatusLabel(pair.status)}
                                        </span>
                                    </div>

                                    {/* pair ID Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-gray-900 border border-gray-800 text-gray-500 px-2 py-0.5 rounded text-[10px] font-mono">
                                            #{pair.id}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {filteredCount > 0 && (
                    <div className="py-8 border-t border-gray-800 flex justify-center mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}

                {filteredCount === 0 && (
                    <div className="text-center py-20 bg-gray-900/50 rounded-2xl border-2 border-gray-800 border-dashed">
                        <div className="bg-gray-800 p-4 rounded-full inline-block mb-4">
                            <ArrowRightLeft className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-white font-bold text-lg">No pairs found</p>
                        <p className="text-gray-500 text-sm">Currently no pairs match this filter.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Pairs;