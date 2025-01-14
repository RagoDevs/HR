import React, { useState } from "react";
import { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { base_url } from "../constant";

let AuthContext = createContext();

export function AuthProvider({ children }) {

  let [token, setToken] = useState(localStorage.getItem("siteToken") || "");
  let [role, setRole] = useState(localStorage.getItem("siteRole") || "");
  let [employeeId, setEmployeeId] = useState('')
  let [err, setErr] = useState("")
  let navigate = useNavigate();

  const signin = async (email, password) => {

    const response = await fetch(`${base_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const res = await response.json();
  
    if (response.status === 200) {
      const token = res.token.token;
      const role = res.role;
      const employeeId = res.employee_id;
      const expire = res.token.expiry;
      if (token ? role : false) {
        setToken(token);
        setRole(role);
        setEmployeeId(employeeId)
        localStorage.setItem("siteToken", token);
        localStorage.setItem("siteRole", role);
        localStorage.setItem("siteExpiry", expire);
        localStorage.setItem('siteId', employeeId);


        if (role === 'admin') {
          navigate('/dashboard');
        } else if (role === 'hr') {
          navigate('/dashboard');
        } else {
          navigate('/staff');
        }



      }
    } else {
      const res = await response.json();
      const err = res.error;
      setErr(err)
    }

  };

  let signout = () => {
    setToken('');
    setRole(null);
    localStorage.removeItem("siteToken");
    localStorage.removeItem("siteRole");
    localStorage.removeItem('siteExpiry');
    localStorage.removeItem('siteId')
    return navigate("/");
  };

 

  let value = { token, role, employeeId, signin, signout, err,};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



export function useAuth() {
  return useContext(AuthContext);
};
