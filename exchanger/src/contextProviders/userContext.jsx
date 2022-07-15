import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import apiService from "../services/APIservice";

const userContext = createContext();

export function useLogin() {
  return useContext(userContext);
}

export function UserLoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const logout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  return (
    <userContext.Provider value={{ loggedIn, setLoggedIn, logout }}>
      {children}
    </userContext.Provider>
  );
}
