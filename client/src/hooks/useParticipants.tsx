import { useState, useMemo } from 'react';
import { useParticipantsContext } from '@/context/ParticipantContext';
import type { UIParticipant,IParticipant } from '@/types';

export const useParticipantsLogic = () => {
    
    const { participants: apiParticipants, loading, error } = useParticipantsContext();

    const [activeFilter, setActiveFilter] = useState<'active' | 'all' | 'matched' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [copiedId, setCopiedId] = useState<string | number | null>(null);
    const itemsPerPage = 10;


    const transformedParticipants: UIParticipant[] = useMemo(() => {
        if (!apiParticipants) return [];
         console.log("API Participants:", apiParticipants);
        return apiParticipants.map((p) => ({
            id: p._id ,
            name: p.name,
            walletAddress: p.walletAddress || '...', 
            giftValue: (p as IParticipant).deposit || 0,
            joinedDate: 'Recently', //to be changed if necessary or totally removed 
            status: (p as IParticipant).status || 'active'
        }));
    }, [apiParticipants]);

   
    const filteredParticipants = useMemo(() => {
        return transformedParticipants
            .filter(p => activeFilter === 'all' ? true : p.status === activeFilter)
            .filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
            );
    }, [transformedParticipants, activeFilter, searchQuery]);

    //Pagination 
    const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedParticipants = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

    // Handlers/Helpers
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to page 1 on search
    };

    const handleFilterChange = (filter: 'active' | 'all' | 'matched' | 'completed') => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    const copyToClipboard = (address: string, id: string | number) => {
        navigator.clipboard.writeText(address);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // UI Helpers 
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
            case 'matched': return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
            case 'completed': return 'bg-green-500/20 border-green-500/30 text-green-400';
            default: return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
        }
    };

    const getStatusLabel = (status: string) => status.charAt(0).toUpperCase() + status.slice(1);
    const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

    return {
        // Data
        paginatedParticipants,
        filteredCount: filteredParticipants.length,
        loading,
        error,
        
        // Pagination
        currentPage,
        totalPages,
        handlePageChange,

        // Search & Filter
        searchQuery,
        setSearchQuery: handleSearch,
        activeFilter,
        setActiveFilter: handleFilterChange,

        // Utils
        copiedId,
        copyToClipboard,
        getStatusColor,
        getStatusLabel,
        truncateAddress
    };
};