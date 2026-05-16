import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const userInfoString = localStorage.getItem('userInfo');

  if (!userInfoString) {
    return <Navigate to="/login" replace />;
  }

  const userInfo = JSON.parse(userInfoString);

  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    // If user role is not allowed, redirect to dashboard or unauthorized page
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
