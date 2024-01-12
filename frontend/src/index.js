import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { TodoProvider } from './context/TodoContext';
import { BackendProvider } from './context/BackendContext';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* Wrapping the App inside necessary providers */}
    <TodoProvider>
      <BackendProvider>
        <AuthProvider>

          <App />

        </AuthProvider>
      </BackendProvider>
    </TodoProvider>
    {/* End of wrapping the App inside necessary providers */}

    
  </React.StrictMode>
);