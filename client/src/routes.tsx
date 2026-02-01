import App from '@/layouts/App';
import HomePage from '@/pages/HomePage';
import Pairs from '@/pages/Pairs';
import ParticipantsPage from '@/pages/ParticipantsPage';

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage/>
      },
      {
        path: "/pairs",
        element: <Pairs/>
      },
      {
        path: "/participants",
        element: <ParticipantsPage/>
      }
     
    ]
  },

];

export default routes;
