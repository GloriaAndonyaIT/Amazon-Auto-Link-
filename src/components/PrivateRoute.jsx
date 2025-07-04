import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;
  
  if (!user) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;