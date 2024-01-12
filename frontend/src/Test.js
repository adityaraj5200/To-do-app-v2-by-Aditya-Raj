// App.js file with protected routes

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import MainApp from './pages/MainApp';
import Profile from './pages/Profile';
import { TodoProvider } from './context/TodoContext';
import { BackendProvider } from './context/BackendContext';
import { AuthProvider, useAuthContext } from './context/AuthContext';

function App() {
  const { currentUser } = useAuthContext();
  return (
    <div className='app '>
      <TodoProvider>
        <BackendProvider>
          <AuthProvider>

            {/* Main content below */}
            <BrowserRouter>
              <Routes>
                <Route path='/' element={currentUser ? <MainApp /> : <Navigate to='/login' />} />
                <Route path='/login' element={!currentUser ? <Login /> : <Navigate to='/' />} />
                <Route path='/signup' element={!currentUser ? <Signup /> : <Navigate to='/' />} />
                <Route path='/profile' element={!currentUser ? <Profile /> : <Navigate to='/' />} />
              </Routes>
            </BrowserRouter>
            {/* Main content above */}

          </AuthProvider>
        </BackendProvider>
      </TodoProvider>

      <ToastContainer />

    </div>
  );
}

export default App;
