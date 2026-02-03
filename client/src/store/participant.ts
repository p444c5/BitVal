import { useState, useMemo, useCallback } from 'react';
import { getAllParticipants } from '@/services/participants.service';
import type { IParticipant,IParticipantStore } from '@/types';



export const useParticipantStore = () : IParticipantStore => {
    const [rawParticipants, setRawParticipants] = useState<IParticipant[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadParticipants = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllParticipants();
            setRawParticipants([...data?.participants]);
            console.log("Participants loaded:", [...data?.participants]);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to load participants");
        } finally {
            setLoading(false);
        }
    }, []);

    const sortedParticipants = useMemo(() => {
        console.log("Sorting participants:", rawParticipants);
        if (!rawParticipants) return [];
        return [...rawParticipants].sort((a, b) => 
            (a.name || '').localeCompare(b.name || '')
        );
    }, [rawParticipants]);

    const count = useMemo(() => rawParticipants.length, [rawParticipants]);
    const pool = useMemo(() => rawParticipants.reduce((sum, p) => sum + (p.deposit || 0), 0), [rawParticipants] );

    return {
        participants: sortedParticipants,
        rawParticipants: rawParticipants,
        count,
        loading,
        error,
        pool,
        loadParticipants
    };
};