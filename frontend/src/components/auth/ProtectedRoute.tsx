import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    allowedRoles?: string[];
    // Deprecated but kept for backward compatibility if needed, though we should migrate
    adminOnly?: boolean;
}

const ProtectedRoute = ({ allowedRoles, adminOnly }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Handle legacy adminOnly prop
    if (adminOnly && user?.role !== 'ADMIN') {
        return <Navigate to="/dashboard" replace />;
    }

    // Handle new allowedRoles prop
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role? Or just default dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
