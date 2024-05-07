import React, { useState } from "react";
import { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom";

let AuthContext = createContext();

export function AuthProvider({ children }) {

  let [token, setToken] = useState(localStorage.getItem("siteToken") || "");
  let [role, setRole] = useState(localStorage.getItem("siteRole") || "");
  let [err, setErr] = useState("")
  let navigate = useNavigate();

  const signin = async (email, password) => {

    const response = await fetch("https://hrbe.eadevs.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status === 200) {
      const res = await response.json();
      const token = res.token.token;
      const role = res.role;
      if (token ? role : false) {
        setToken(token);
        setRole(role);
        localStorage.setItem("siteToken", token);
        localStorage.setItem("siteRole", role);

        navigate('/Dashboard');

      }
    } else {
      const res = await response.json();
      const err = res.error;
      setErr(err)
    }

  }

  let signout = () => {
    setToken('');
    setRole(null);
    localStorage.removeItem("site");
    localStorage.removeItem("site");
    return navigate("/");
  };

  let value = { token, role, signin, signout, err };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



export function useAuth() {
  return useContext(AuthContext);
}
