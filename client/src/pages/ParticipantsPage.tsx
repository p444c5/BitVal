import React from 'react';
import AllParticipants from '@/components/participants/AllParticipants';

const ParticipantsPage: React.FC = () => {

    return (
        <div>
            
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AllParticipants/>
            </section>
        </div>
    );
};

export default ParticipantsPage;