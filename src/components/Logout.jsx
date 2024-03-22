import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./verify/Auth";

const Logout = () => {
  const { isLoggedIn, LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  useEffect(() => {
  }, [isLoggedIn]);

  return isLoggedIn ? null : <Navigate to="/login" />;
};

export default Logout;