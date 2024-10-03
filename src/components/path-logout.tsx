import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { RootState } from "../redux-store/store";

interface PathLogoutProps {
  children: ReactNode;
}

export const PathLogout: React.FC<PathLogoutProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual);

  if (user) {
    return <Navigate to={`/dashboard`} replace />;
  }

  return <>{children}</>;
};
