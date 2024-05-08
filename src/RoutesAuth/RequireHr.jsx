import React from 'react'
import { useLocation,Navigate} from "react-router-dom"
import { useAuth } from "./AuthProvider"



export function RequireHr({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.token || auth.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
