import React from "react";
import AuthForm from "../features/auth/components/AuthForm";

const SignUp: React.FC = () => {
  return (
    <div>
      <AuthForm mode="signup" />
    </div>
  );
};

export default SignUp;
