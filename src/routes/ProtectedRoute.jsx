import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
  const [cookies] = useCookies(['token']);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    // Simulate an async operation to fetch auth status
    setLoading(false);
  }, [cookies.token, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (token=='') {
    console.log("Cookies",cookies.token);
    console.log("Redux State",isAuthenticated);
    console.log("Token",token);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;