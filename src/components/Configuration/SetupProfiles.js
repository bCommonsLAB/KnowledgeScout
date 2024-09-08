import React from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addProfile, removeProfile } from '../../redux/profileSlice';

const SetupProfiles = () => {
  const [newProfile, setNewProfile] = React.useState('');
  const profiles = useSelector((state) => state.profile.profiles);
  const dispatch = useDispatch();

  const handleAddProfile = () => {
    if (newProfile.trim() !== '') {
      dispatch(addProfile(newProfile.trim()));
      setNewProfile('');
    }
  };

  return (
    <div>
      <Typography variant="h6">Setup Profiles</Typography>
      <TextField
        label="New Profile"
        value={newProfile}
        onChange={(e) => setNewProfile(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button startIcon={<Add />} onClick={handleAddProfile} variant="contained" color="primary">
        Add Profile
      </Button>
      <List>
        {profiles.map((profile) => (
          <ListItem key={profile}>
            <ListItemText primary={profile} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeProfile(profile))}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SetupProfiles;
