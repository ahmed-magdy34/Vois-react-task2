import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/store";
interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedAuthRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedAuthRoute;
