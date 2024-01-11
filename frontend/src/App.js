import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import MainApp from './pages/MainApp';
import Profile from './pages/Profile';
import { TodoProvider } from './context/TodoContext';
import { BackendProvider } from './context/BackendContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className='app '>
      <TodoProvider>
        <BackendProvider>
          <AuthProvider>

            {/* Main content below */}
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<MainApp />} />
                <Route  path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile />} />
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
