import React, { useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Select, MenuItem, IconButton, Box, Switch } from '@mui/material';
import { Menu, Settings, AccountCircle, ExitToApp } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from '../redux/profileSlice';
import { useTheme } from '@mui/material/styles';
import ConfigurationMain from '../components/Configuration/ConfigurationMain';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box component="footer" sx={{ 
      p: 2, 
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800], 
      color: theme.palette.text.secondary,
      textAlign: 'center'
    }}>
      <Typography variant="body2">
        © 2023 KnowledgeScout. Alle Rechte vorbehalten.
      </Typography>
    </Box>
  );
};

const MainLayout = ({ toggleColorMode }) => {
  const currentProfile = useSelector((state) => state.profile.currentProfile);
  const dispatch = useDispatch();
  const [configOpen, setConfigOpen] = useState(false);
  const theme = useTheme();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleConfig = () => {
    setConfigOpen(!configOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            KnowledgeScout
          </Typography>
          <Select
            value={currentProfile}
            onChange={(e) => dispatch(setProfile(e.target.value))}
            style={{ marginRight: '1rem', color: 'inherit' }}
          >
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Research">Research</MenuItem>
          </Select>
          <Switch checked={theme.palette.mode === 'dark'} onChange={toggleColorMode} />
          <IconButton color="inherit" onClick={() => navigate('/userprofile')}><AccountCircle /></IconButton>
          <IconButton color="inherit" onClick={toggleConfig}><Settings /></IconButton>
          <IconButton color="inherit" onClick={handleLogout}><ExitToApp /></IconButton>
        </Toolbar>
      </AppBar>
      <Breadcrumb />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Outlet />
      </Box>
      <Footer />
      <ConfigurationMain open={configOpen} onClose={toggleConfig} />
    </Box>
  );
};

export default MainLayout;
