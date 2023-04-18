import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/userAuthContext.js';

const PrivateRoutes = () => {
  const { currentUser } = useAuth();
  
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
