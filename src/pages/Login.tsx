import React from "react";
import AuthForm from "../features/auth/components/AuthForm";

/**
 * Login component renders the login form.
 * It uses the AuthForm component with mode set to "login".
 * This component is responsible for handling user login functionality.
 * It is a functional component that uses React and TypeScript.
 * it is the page where users can log in to their accounts.
 *
 * @returns {JSX.Element}
 */

const Login: React.FC = () => {
  return (
    <div>
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;
