import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import { checkAuth } from './services/authService';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import InitialRedirect from './components/InitialRedirect';
import PrivateRoute from './components/PrivateRoute';
import Admin from './pages/Admin';
import Notification from './components/Notification';

function App() {
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      const status = await checkAuth();
      setAuthStatus(status);
    };
    authenticate();
  }, []);

  return (
    <>
      {authStatus && (
        <Router>
          <Navbar user={authStatus.user} />
          <div className="pt-16"> {/* Ajusta el padding top según la altura de tu navbar */}
            <Notification />
            <Routes>
              <Route path="/" element={<InitialRedirect authStatus={authStatus} />} />
              <Route path="/login" element={
                <PublicRoute authStatus={authStatus}>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute authStatus={authStatus}>
                  <Register />
                </PublicRoute>
              } />
              <Route
                path="/admin"
                element={
                  <PrivateRoute roles={['ADMIN']} authStatus={authStatus}>
                    <Admin authStatus={authStatus} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute authStatus={authStatus}>
                    <Tasks />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
