import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './theme';
import MainLayout from './layouts/MainLayout';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import CaptureMode from './components/CaptureMode/CaptureMode';
import ArchiveSearch from './components/ArchiveSearch/ArchiveSearch';
import Chatbot from './components/Chatbot/Chatbot';
import { testConnection } from './redux/connectionSlice';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { AuthProvider, AuthContext } from './context/AuthContext';
import UserProfile from './components/UserProfile/UserProfile';
import ProfileManagement from './components/ProfileManagement/ProfileManagement';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();
  const connectionStatus = useSelector((state) => state.connection.status);
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    dispatch(testConnection());
  }, [dispatch]);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {connectionStatus === 'pending' ? (
          <div>Verbindung wird hergestellt...</div>
        ) : connectionStatus === 'error' ? (
          <div>Fehler bei der Serververbindung. Bitte versuchen Sie es später erneut.</div>
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout toggleColorMode={toggleColorMode} />}>
                <Route index element={<WelcomeScreen />} />
                <Route path="capture" element={<PrivateRoute><CaptureMode /></PrivateRoute>} />
                <Route path="archive" element={<PrivateRoute><ArchiveSearch /></PrivateRoute>} />
                <Route path="chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                <Route path="profiles" element={<PrivateRoute><ProfileManagement /></PrivateRoute>} />
              </Route>
            </Routes>
          </Router>
        )}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
