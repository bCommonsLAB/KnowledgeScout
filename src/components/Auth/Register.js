import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert('Registrierung fehlgeschlagen: ' + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Registrierung
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Benutzername"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <TextField
          fullWidth
          margin="normal"
          label="Vorname"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Nachname"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrieren
        </Button>
      </form>
    </Container>
  );
};

export default Register;
