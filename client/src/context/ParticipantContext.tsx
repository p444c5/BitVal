import React, { createContext, useContext, useEffect} from 'react';
import type { ReactNode } from 'react';
import { useParticipantStore } from '@/store/participant';

type StoreType = ReturnType<typeof useParticipantStore>;

const ParticipantsContext = createContext<StoreType | undefined>(undefined);

export const ParticipantsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const store = useParticipantStore();
    useEffect(() => {
        store.loadParticipants();
    }, []);

    return (
        <ParticipantsContext.Provider value={store}>
            {children}
        </ParticipantsContext.Provider>
    );
};

export const useParticipantsContext = () => {
    const context = useContext(ParticipantsContext);
    if (!context) {
        throw new Error('useParticipants must be used within a ParticipantsProvider');
    }
    return context;
};