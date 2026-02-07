import React, { useMemo, useState, useEffect } from 'react';
import { Gift, Users, Calendar, Heart, Lock, Shuffle, Clock } from 'lucide-react';
import RecentParticipants from '@/components/participants/RecentParticipants';
import { useParticipantsContext } from '@/context/ParticipantContext';
import type { IParticipant, UIParticipant } from '@/types';

// Define Event Milestones
const DATES = {
    PAIRING: new Date('2026-02-11T00:00:00').getTime(), 
    REVEAL: new Date('2026-02-14T00:00:00').getTime()  
};

type EventPhase = 'registration' | 'pairing' | 'live';

const Home: React.FC = () => {
    const {rawParticipants, count,pool} = useParticipantsContext();

    // Data mapping for Recent Participants
    const recentParticipants: UIParticipant[] = useMemo(() => {
        return rawParticipants.slice(0, 10).map((p: IParticipant) => ({
            id: p._id, 
            name: p.name,
            walletAddress: p.walletAddress,
            giftValue: p.deposit, 
            joinedDate: p.createdAt!
        }));
    }, [rawParticipants]);


    const [phase, setPhase] = useState<EventPhase>('registration');
    const [targetDate, setTargetDate] = useState<number>(DATES.PAIRING);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();

            // Determines Phase & Target
            if (now < DATES.PAIRING) {
                setPhase('registration');
                setTargetDate(DATES.PAIRING);
            } else if (now >= DATES.PAIRING && now < DATES.REVEAL) {
                setPhase('pairing');
                setTargetDate(DATES.REVEAL);
            } else {
                setPhase('live');
                setTargetDate(0); 
            }

            // Calculates differennce to Current Target
            if (targetDate > 0) {
                const distance = targetDate - now;

                if (distance < 0) {
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                } else {
                    setTimeLeft({
                        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((distance % (1000 * 60)) / 1000)
                    });
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]); 


   

    // Helper to get Status Text based on phase
    const getStatusDisplay = () => {
        switch(phase) {
            case 'registration': 
                return { text: "Registration Open", color: "text-emerald-400", bg: "bg-emerald-500", icon: Calendar };
            case 'pairing': 
                return { text: "Pairing In Progress", color: "text-amber-400", bg: "bg-amber-500", icon: Shuffle };
            case 'live': 
                return { text: "Event Live", color: "text-rose-400", bg: "bg-rose-500", icon: Gift };
        }
    };

    const statusInfo = getStatusDisplay();

    return (
        <>
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                        Bit<span className="text-rose-500">Val</span> 2026
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        The Exclusive Valentine's Gift Exchange Event. <br/>
                        <span className="text-rose-400 font-medium">
                            {phase === 'registration' && "Join before the doors close."}
                            {phase === 'pairing' && "Matches are being generated..."}
                            {phase === 'live' && "Exchanges are live now!"}
                        </span>
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">Registered Participants</p>
                                <p className="text-3xl font-bold text-white mt-1">{count}</p>
                            </div>
                            <div className="bg-pink-500/10 p-3 rounded-full">
                                <Users className="w-6 h-6 text-pink-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">Est. Pool Value</p>
                                <p className="text-3xl font-bold text-white mt-1">
                                 {pool ? pool.toFixed(8) : "0.00000000"} BTC
                                </p>
                            </div>
                            <div className="bg-purple-500/10 p-3 rounded-full">
                                <Gift className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC STATUS CARD */}
                    <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm font-medium">Event Status</p>
                                <p className={`text-lg font-bold mt-2 flex items-center gap-2 ${statusInfo.color}`}>
                                    <span className={`w-2 h-2 rounded-full ${statusInfo.bg} animate-pulse`}></span>
                                    {statusInfo.text}
                                </p>
                            </div>
                            <div className={`${statusInfo.color.replace('text', 'bg')}/10 p-3 rounded-full`}>
                                <statusInfo.icon className={`w-6 h-6 ${statusInfo.color}`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/*  Recent Participants */}

                    <div>
                        <h3 className="text-xl font-bold text-white mb-6">New Entries</h3>
                          <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                           { recentParticipants.length > 0 ? (
                            <RecentParticipants participants={recentParticipants} />
                        ) : (   
                        <h5 className="text-gray-300 text-md font-semibold">No Participants yet</h5>    
                        )}</div>
                       
                    </div>

                    {/* Tools & Timeline */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* COUNTDOWN BANNER */}
                        {phase !== 'live' ? (
                            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 md:flex md:items-center md:justify-between">
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <div className="p-3 bg-gray-700/30 rounded-lg">
                                        <Clock className="w-6 h-6 text-rose-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">
                                            {phase === 'registration' ? "Pairing Begins In" : "The Big Reveal In"}
                                        </h4>
                                        <p className="text-rose-300 text-sm">
                                            {phase === 'registration' 
                                                ? "Get ready to know your partner" 
                                                : "Matches are locked. Live event in"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    {['Days', 'Hrs', 'Mins', 'Secs'].map((label, i) => {
                                        const value = Object.values(timeLeft)[i];
                                        return (
                                            <div key={label} className="text-center">
                                                <div className="bg-gray-900 w-16 py-2 rounded-lg border border-gray-700 mb-1">
                                                    <span className="text-xl font-mono font-bold text-white">
                                                        {value.toString().padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-400 uppercase">{label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            // Banner shown when event is LIVE
                            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-rose-500/20 rounded-lg">
                                        <Heart className="w-6 h-6 text-rose-500 animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">Exchanges are Live!</h4>
                                        <p className="text-rose-200 text-sm">Check your dashboard to see your match.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        
                        {/* Event Timeline (Dynamic Active States) */}
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-rose-500" />
                                Event Timeline
                            </h3>
                            
                            <div className="relative">
                                {/* Vertical line */}
                                <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-700" />

                                <div className="space-y-12">
                                    
                                    {/* Phase 1 */}
                                    <div className={`relative flex items-start gap-6 ${phase !== 'registration' ? 'opacity-50' : ''}`}>
                                        <div className={`absolute left-2.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-gray-900 mt-1.5 z-10 box-content 
                                            ${phase === 'registration' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                                        <div className="pl-8">
                                            <h4 className="text-lg font-bold text-white">Registration Phase</h4>
                                            <p className="text-emerald-400 text-xs font-mono mb-2 uppercase tracking-wider">
                                                {phase === 'registration' ? "● ACTIVE NOW" : "COMPLETED"}
                                            </p>
                                            <p className="text-gray-400 text-sm">Admin uploads verified participants to the pool securely.</p>
                                        </div>
                                    </div>

                                    {/* Phase 2: Pairing */}
                                    <div className={`relative flex items-start gap-6 ${phase === 'pairing' ? 'opacity-100' : 'opacity-60'}`}>
                                        <div className={`absolute left-2.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-gray-900 mt-1.5 z-10 box-content
                                             ${phase === 'pairing' ? 'bg-emerald-500' : 'bg-gray-600'}`} />
                                        <div className="pl-8">
                                            <h4 className="text-lg font-bold text-white">Pairing</h4>
                                            <p className="text-yellow-400 text-xs font-mono mb-2">FEBRUARY 11, 2026</p>
                                            <p className="text-gray-400 text-sm">
                                                {phase === 'pairing' ? "Algorithm is shuffling..." : "Our algorithm shuffles the pool and assigns gifters."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phase 3: Reveal */}
                                    <div className={`relative flex items-start gap-6 ${phase === 'live' ? 'opacity-100' : 'opacity-60'}`}>
                                        <div className={`absolute left-2.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-gray-900 mt-1.5 z-10 box-content
                                            ${phase === 'live' ? 'bg-rose-500' : 'bg-gray-600'}`} />
                                        <div className="pl-8">
                                            <h4 className="text-lg font-bold text-white">The Big Reveal & Exchange</h4>
                                            <p className="text-fuchsia-400 text-xs font-mono mb-2">FEBRUARY 14, 2026</p>
                                            <p className="text-gray-400 text-sm">Gifts are distributed simultaneously.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-800/30 border border-gray-700 p-6 rounded-xl hover:bg-gray-800/50 transition-colors group">
                                <Lock className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="text-white font-bold mb-2">Secure Upload</h4>
                                <p className="text-gray-400 text-xs">Participants are batched uploaded by admins to ensure verify identities.</p>
                            </div>
                            <div className="bg-gray-800/30 border border-gray-700 p-6 rounded-xl hover:bg-gray-800/50 transition-colors group">
                                <Shuffle className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="text-white font-bold mb-2">Fair Shuffle</h4>
                                <p className="text-gray-400 text-xs">No duplicates. No self-matches. Guaranteed circular matching logic.</p>
                            </div>
                         </div>

                    </div>
                   
                </div>
            </section>
        </>
    );
};

export default Home;