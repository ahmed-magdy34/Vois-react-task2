import React from "react";
import AuthForm from "../features/auth/components/AuthForm";

const Login: React.FC = () => {
  return (
    <div>
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;
