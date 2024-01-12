import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to manage authentication status and user data
  const [currentUser, setCurrentUser] = useState(null);
  
  // Function to set user and token upon successful login
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('userData', userData);
  };

  
  // Function to log out
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('userData');
  };

  // Provide the context value to its children
  const contextValue = {
    currentUser,
    login,
    logout,
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);


  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Create a hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);