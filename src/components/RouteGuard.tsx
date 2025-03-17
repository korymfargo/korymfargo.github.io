import { AppDispatch, RootState } from "@store";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ActionLogin } from "@store";

interface RouteGuardProps {
  redirectTo: string;
  children: ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ redirectTo, children }) => {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => {
    if (state.user.loggedIn) return true;

    // if already logged in fetch user information from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user && user.loggedIn) {
      dispatch(
        ActionLogin({
          name: user.name,
          email: user.email,
        })
      );

      return true;
    }
  });
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

export default RouteGuard;
