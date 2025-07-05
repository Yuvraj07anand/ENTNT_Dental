import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
 {/* Protected routes  */}
const ProtectedRoute = ({ roles }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (roles && !roles.includes(currentUser.role)) {
    return currentUser.role === 'Patient' 
      ? <Navigate to="/my-account" replace /> 
      : <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;