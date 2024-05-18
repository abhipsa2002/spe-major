import React, { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null); // State to hold the user's email

  const login = (userEmail) => {
    setEmail(userEmail); // Set the email state when logging in
  };

  const logout = () => {
    setEmail(null); // Clear the email state when logging out
  };

  return (
    <EmailContext.Provider value={{ email, login, logout }}>
      {children}
    </EmailContext.Provider> 
  );
};

export const useEmail = () => {
  return useContext(EmailContext);
};