import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ProfileManagement = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingProfileId, setEditingProfileId] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/profiles', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      } else {
        throw new Error('Fehler beim Abrufen der Profile');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Profile:', error);
      alert('Fehler beim Abrufen der Profile: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProfileId
        ? `http://localhost:5000/api/users/profiles/${editingProfileId}`
        : 'http://localhost:5000/api/users/profiles';
      const method = editingProfileId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchProfiles();
        setFormData({ name: '', description: '' });
        setEditingProfileId(null);
        alert(editingProfileId ? 'Profil aktualisiert' : 'Profil erstellt');
      } else {
        throw new Error('Fehler beim Speichern des Profils');
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Profils:', error);
      alert('Fehler beim Speichern des Profils: ' + error.message);
    }
  };

  const handleEdit = (profile) => {
    setFormData({ name: profile.name, description: profile.description });
    setEditingProfileId(profile._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/profiles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        fetchProfiles();
        alert('Profil gelöscht');
      } else {
        throw new Error('Fehler beim Löschen des Profils');
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Profils:', error);
      alert('Fehler beim Löschen des Profils: ' + error.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Profilmanagement
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Profilname"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Beschreibung"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {editingProfileId ? 'Profil aktualisieren' : 'Profil erstellen'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
        Meine Profile
      </Typography>
      <List>
        {profiles.map((profile) => (
          <ListItem key={profile._id}>
            <ListItemText primary={profile.name} secondary={profile.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(profile)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(profile._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProfileManagement;