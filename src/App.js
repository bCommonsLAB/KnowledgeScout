import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './theme';
import MainLayout from './layouts/MainLayout';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import CaptureMode from './components/CaptureMode/CaptureMode';
import ArchiveSearch from './components/ArchiveSearch/ArchiveSearch';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout toggleColorMode={toggleColorMode} />}>
            <Route index element={<WelcomeScreen />} />
            <Route path="capture" element={<CaptureMode />} />
            <Route path="archive" element={<ArchiveSearch />} />
            <Route path="chatbot" element={<Chatbot />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
