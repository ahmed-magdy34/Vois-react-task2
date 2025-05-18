import React from "react";
import AuthForm from "../features/auth/components/AuthForm";

/**signup
 * it uses the AuthForm component with mode set to "signup".
 * This component is responsible for handling user signup functionality.
 * It is a functional component that uses React and TypeScript.
 *
 * @returns {JSX.Element}
 * @description SignUp component renders the signup form.
 */
const SignUp: React.FC = () => {
  return (
    <div>
      <AuthForm mode="signup" />
    </div>
  );
};

export default SignUp;
