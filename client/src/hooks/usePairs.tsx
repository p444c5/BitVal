import { useState, useEffect, useMemo } from 'react';
import { useParticipantsContext } from '@/context/ParticipantContext';
import type { Pair } from '@/types';


export const usePairs = () => {
   const { participants: apiParticipants, loading } = useParticipantsContext();
    const [pairs, setPairs] = useState<Pair[]>([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'pending' | 'in-progress'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const transformToPairs = (participants: typeof apiParticipants): Pair[] => {
        if (!participants) return [];
    
        const pairedParticipants = participants.filter(p => p.isPaired && p.pairedWith);
        
        return pairedParticipants.map((p, index) => {

            const pairedParticipant = participants.find(part => part._id.toString() === p.pairedWith?.toString());
            
            // determine pair status based on participant status
            let pairStatus: 'completed' | 'pending' | 'in-progress' = 'in-progress';

            if (p.status === 'matched') {
                pairStatus = 'in-progress';
            } else if (p.status === 'allocated') {
                pairStatus = 'pending';
            } else if (p.status === 'completed') {
                pairStatus = 'completed';
            }

            return {
                id: index + 1,
                from: p.name || 'Unknown',
                fromValue: p.amountAllocated ?? 0, 
                to: pairedParticipant?.name || 'Unknown',   
                toValue: pairedParticipant?.amountAllocated ?? 0, 
                timestamp: new Date().toISOString(),
                status: pairStatus
            };
        });
    }


    useEffect(() => {
        if (apiParticipants) {
            setPairs(transformToPairs(apiParticipants));
        }
    }, [apiParticipants]);

    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeFilter]);

    const filteredPairs = useMemo(() => {
        if (!pairs) return [];

        return pairs.filter((pair: Pair) => {
            const matchesStatus = activeFilter === 'all' || pair.status === activeFilter;

            const query = searchQuery.toLowerCase();
            const matchesSearch = !query ||pair.from.toLowerCase().includes(query) ||pair.to.toLowerCase().includes(query) || pair.id.toString().includes(query);
            return matchesStatus && matchesSearch;
        });
    }, [pairs, searchQuery, activeFilter]);

    // Pagination 
    const totalPages = Math.ceil(filteredPairs.length / itemsPerPage);
    const paginatedPairs = filteredPairs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
            case 'in-progress':
                return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
            case 'pending':
                return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500';
            default:
                return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
        }
    };

    const getStatusLabel = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
    };

    return {
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
        filteredCount: filteredPairs.length
    };
};