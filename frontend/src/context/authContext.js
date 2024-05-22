import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  const login = async (inputs) => {
    const res = await axios.post("https://social-media-web-api.vercel.app/api/auth/login", inputs, {
      withCredentials: true,
    });
    console.log(res.data)
    setCurrentUser(res.data)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser ,login }}>
      {children}
    </AuthContext.Provider>
  );
};
