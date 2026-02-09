import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import api, { getAccessToken, setAccessToken } from '@/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getAccessToken();
  // Checks our persistent flag
  const shouldBeAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [isVerifying, setIsVerifying] = useState(shouldBeAuthenticated && !token);

  useEffect(() => {
    // Attempts restoration if we expect to be authenticated but have no token
    if (shouldBeAuthenticated && !token) {
        const restoreSession = async () => {
            const toastId = toast.loading("Restoring secure session...");
            
            try {
                const res = await api.post<{accessToken: string}>('/auth/refresh');
                setAccessToken(res.data.accessToken);
                toast.success("Welcome back!", { id: toastId, duration: 2000 });
            } catch (error) {
                console.error("Session restoration failed", error);
                toast.error("Session expired. Please login again.", { id: toastId });
            } finally {
                setIsVerifying(false);
            }
        };
        restoreSession();
    } else {
        setIsVerifying(false);
    }
  }, [shouldBeAuthenticated, token]);

  if (isVerifying) {
      return <div className="min-h-screen bg-gray-950" />;
  }

  // If after checking, we still don't have a token, it  redirects
  if (!getAccessToken() && !shouldBeAuthenticated) {
     return <Navigate to="/admin/login" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;