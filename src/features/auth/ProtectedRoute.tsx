import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/store";

/**
 * ProtectedRoute component checks if the user is authenticated.
 * If the user is authenticated, it renders the children components.
 * If not, it redirects to the login page.
 * prevents unauthorized access to protected routes.
 *
 * no user should be able to access the dashboard, posts, and new post pages without being logged in.
 * returns the children components if the user is authenticated.
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  console.log(token, "token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children};</>;
};

export default ProtectedRoute;
