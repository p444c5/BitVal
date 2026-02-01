import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useParticipantsContext } from '@/context/ParticipantContext';

function App() {
   const { loading, count } = useParticipantsContext();

   if (loading && count === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 gap-4">
                {/* Ring Spinner */}
                <div className="w-12 h-12 rounded-full border-4 border-gray-800 border-t-rose-500 animate-spin"></div>
                <div className="text-rose-400/80 text-sm font-medium animate-pulse">Loading event details...</div>
            </div>
        );
    }
  return (
    <>
      <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col font-sans selection:bg-gray-700 selection:text-white">
        
        <Header />

        {/* Main Content */}
        <main className="flex-1 pt-24">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App;