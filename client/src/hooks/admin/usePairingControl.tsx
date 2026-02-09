import { useState } from 'react';
import { AxiosError } from 'axios';
import api from '../../api';
import type { UsePairingControlReturn, ProcessStatus } from '@/types';

export const usePairingControl = (): UsePairingControlReturn => {
    const [pairingStatus, setPairingStatus] = useState<ProcessStatus>('idle');
    const [allocatingStatus, setAllocatingStatus] = useState<ProcessStatus>('idle');
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

    const handlePairing = async ()  => {
        if (!confirm("Are you sure? This will shuffle all active participants.")) return;
        setPairingStatus('processing');
        addLog("Starting pairing process...");
        try {
            const res = await api.post<{ message: string }>('/admin/pair');
            addLog(`Pairing Success: ${res.data.message}`);
            setPairingStatus('success');
        } catch (error) {
            setPairingStatus('error');
            const err = error as AxiosError<{ message: string;}>;
            const message = err.response?.data?.message || err.message;
            addLog(`Pairing Failed: ${message}`);
        }
    };

    const handleAllocation = async ()  => {
        if (!confirm("This will distribute amounts based on the logic. Proceed?")) return;
        setAllocatingStatus('processing');
        addLog("Starting gift allocation...");
        try {
            const res = await api.post<{ message: string }>('/admin/allocate');
            addLog(`Allocation Success: ${res.data.message}`);
            setAllocatingStatus('success');
        } catch (error) {
            setAllocatingStatus('error');
            const err = error as AxiosError<{ message: string;}>;
            const message = err.response?.data?.message || err.message;
            addLog(`Allocation Failed: ${message}`);
        }
    };

    return {
        pairingStatus,
        allocatingStatus,
        logs,
        handlePairing,
        handleAllocation
    };
};
