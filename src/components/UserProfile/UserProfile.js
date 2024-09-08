
import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.user, localStorage.getItem('token'));
        setIsEditing(false);
        alert('Profil erfolgreich aktualisiert');
      } else {
        throw new Error(data.message || 'Ein Fehler ist aufgetreten');
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Profils:', error);
      alert('Fehler beim Aktualisieren des Profils: ' + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Benutzerprofil
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vorname"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nachname"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-Mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              {isEditing ? (
                <>
                  <Button type="submit" variant="contained" color="primary" style={{ marginRight: '1rem' }}>
                    Speichern
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                    Abbrechen
                  </Button>
                </>
              ) : (
                <Button variant="contained" color="primary" onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                }}>
                  Profil bearbeiten
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UserProfile;