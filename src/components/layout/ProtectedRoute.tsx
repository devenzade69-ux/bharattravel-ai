import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-label-lg text-label-lg text-secondary">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, saving the attempted location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
