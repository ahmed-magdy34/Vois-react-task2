import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/store";
/**
 * ProtectedAuthRoute component checks if the user is authenticated.
 * If the user is authenticated, it redirects to the home page.
 * If not, it renders the children components.
 * makes the user unable to access the login page if they are already logged in to prevent adding more token to the local storage.
 * @component
 * renders the children components if the user is not authenticated.
 *
 */
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
