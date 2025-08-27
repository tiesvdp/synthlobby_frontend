import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

interface AuthRouteProps {
  children: React.ReactElement;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;
