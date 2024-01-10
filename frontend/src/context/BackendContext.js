import React, { createContext, useContext } from 'react';

const BackendContext = createContext();

export const BackendProvider = ({ children }) => {
  const backend_port = 5000;
  const api_base = `http://localhost:${backend_port}`;

  return (
    <BackendContext.Provider value={{ api_base }}>
      {children}
    </BackendContext.Provider >
  )
};

export const useBackendContext = () => useContext(BackendContext);