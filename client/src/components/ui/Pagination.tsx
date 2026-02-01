import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = ""
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all border ${currentPage === page
                            ? 'bg-rose-700/80 border-rose-700/50 text-white shadow-lg shadow-rose-900/20'
                            : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Page Info */}
            <span className="text-gray-500 text-sm ml-4 hidden sm:inline-block">
                Page <span className="text-white">{currentPage}</span> of {totalPages}
            </span>
        </div>
    );
};

export default Pagination;