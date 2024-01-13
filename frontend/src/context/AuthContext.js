import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to manage authentication status and user data
  const [currentUser, setCurrentUser] = useState(null);

  // Function to set user and token upon successful login
  const login = (userData) => {
    return new Promise((resolve, reject) => {
      try {
        setCurrentUser(userData);
        localStorage.setItem('userData', userData);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  // Function to log out
  const logout = () => {
    return new Promise((resolve, reject) => {
      try {
        console.log('Before setCurrentUser and localStorage.removeItem');
        setCurrentUser(null);
        localStorage.removeItem('userData');
        console.log('After setCurrentUser and localStorage.removeItem');
        resolve();
      } catch (error) {
        console.error('Error in logout', error);
        reject(error);
      }
    });
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