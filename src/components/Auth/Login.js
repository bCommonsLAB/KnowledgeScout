import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login-Antwort:', data);
        if (data.user && data.token) {
          login(data.user, data.token);
          console.log('Login erfolgreich, navigiere zur Startseite');
          navigate('/');  // Dies navigiert zur Startseite (WelcomeScreen)
        } else {
          throw new Error('Ungültige Antwortdaten vom Server');
        }
      } else {
        throw new Error(data.message || 'Ein Fehler ist aufgetreten');
      }
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
      alert('Login fehlgeschlagen: ' + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="E-Mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Passwort"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          EINLOGGEN
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Noch kein Konto? <Link component={RouterLink} to="/register">Hier registrieren</Link>
      </Typography>
    </Container>
  );
};

export default Login;
