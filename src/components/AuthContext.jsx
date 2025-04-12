import { createContext, useState } from "react";

export const AuthContent = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => setUser(null);

  return (
    <AuthContent.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContent.Provider>
  );
};
