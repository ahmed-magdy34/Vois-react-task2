import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Posts from "./pages/Posts";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import ProtectedAuthRoute from "./features/auth/ProtectedAuthRoute";

const App = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="posts" element={<Posts />} />
        <Route path="newpost" element={<NewPost />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
      <Route
        path="login"
        element={
          <ProtectedAuthRoute>
            <Login />
          </ProtectedAuthRoute>
        }
      />

      <Route
        path="signup"
        element={
          <ProtectedAuthRoute>
            <SignUp />
          </ProtectedAuthRoute>
        }
      />
    </Routes>
  );
};

export default App;
