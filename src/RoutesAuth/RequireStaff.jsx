import React from 'react'
import { useLocation,Navigate} from "react-router-dom"
import { useAuth } from "./AuthProvider"



export function RequireStaff({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.token || auth.role !== "staff") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}