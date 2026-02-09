import App from '@/layouts/App';
import HomePage from '@/pages/HomePage';
import Pairs from '@/pages/Pairs';
import ParticipantsPage from '@/pages/ParticipantsPage';
import ParticipantsManager from '@/pages/admin/ParticipantsManager';
import PairingControl from '@/pages/admin/PairingControl';
import DashboardPage from '@/pages/admin/DashboardPage';
import Admin from '@/layouts/Admin';
import AdminLogin from '@/pages/auth/AdminLogin';
import NotFoundPage from './pages/404Page';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ParticipantsProvider } from '@/context/ParticipantContext';

const routes = [
  {
    path: "/",
    element: (
      <ParticipantsProvider>
        <App />
      </ParticipantsProvider>
    ),
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "/pairs",
        element: <Pairs />
      },
      {
        path: "/participants",
        element: <ParticipantsPage />
      }
    ]
  },

  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <AdminLogin />
      },
      {
        element: (
          <ProtectedRoute>
            <ParticipantsProvider>
              <Admin />
            </ParticipantsProvider>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />
          },
          {
            path: "participants",
            element: <ParticipantsManager />
          },
          {
            path: "pairing",
            element: <PairingControl />
          },
          {
            index: true,
            element: <DashboardPage />
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  },
];

export default routes;