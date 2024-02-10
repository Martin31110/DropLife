import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";


export const ProtectedRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  
};
