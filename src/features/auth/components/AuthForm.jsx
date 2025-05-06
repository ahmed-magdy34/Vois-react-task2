import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { firebaseLogin, firebaseSignUp } from "../../../services/apiAuth";
import styles from "./AuthForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../AuthSlice";

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordLengthErr, setPasswordLengthErr] = useState(false);
  const [backendErr, setBackendErr] = useState("");
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
  let authFn;
  if (mode === "signup") {
    authFn = firebaseSignUp;
  } else {
    authFn = firebaseLogin;
  }
  const { mutate, data, isLoading, error } = useMutation({
    mutationFn: ({ email, password }) => authFn(email, password),
    onSuccess: (returnedData) => {
      localStorage.setItem("token", returnedData.idToken);
      dispatch(
        setAuth({ token: returnedData.idToken, email: returnedData.email })
      );
      console.log(returnedData);
      navigate("/dashboard");
    },
    onError: (err) => {
      setBackendErr(err.message);
    },
  });
  console.log(error);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    setEmailErr(false);
    setPasswordErr(false);
    setPasswordLengthErr(false);

    let hasError = false;

    if (!email || !emailRegex.test(email)) {
      setEmailErr(true);
      hasError = true;
    }

    if (!password) {
      setPasswordErr(true);
      hasError = true;
    } else if (password.length < 6) {
      setPasswordLengthErr(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    mutate({ email, password });

    setEmail("");
    setPassword("");
  };

  return (
    <form className={styles.form} onSubmit={(e) => onSubmitHandler(e)}>
      <h1>{mode === "signup" ? "Register" : "login"}</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailErr && <p className={styles.error}>valid email required</p>}
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordErr && <p className={styles.error}>Password is required</p>}
        {passwordLengthErr && (
          <p className={styles.error}>
            Password must be more than 6 characters
          </p>
        )}
      </div>
      <div>
        {mode === "login" && (
          <p>
            Don't have an account?<Link to="/signup">Sign Up</Link>
          </p>
        )}
        {mode === "signup" && (
          <p>
            Already have an account?<Link to="/login">Sign In</Link>
          </p>
        )}
      </div>
      <button>{mode === "signup" ? "Sign Up" : "Login"}</button>
      {backendErr && <p className={styles.error}>{backendErr}</p>}
    </form>
  );
};

export default AuthForm;
