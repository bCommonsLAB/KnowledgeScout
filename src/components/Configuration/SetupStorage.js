import React from 'react';
import { Typography, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';

const SetupStorage = () => {
  const [selectedStorage, setSelectedStorage] = React.useState('filesystem');

  return (
    <div>
      <Typography variant="h6">Setup Storage</Typography>
      <RadioGroup
        aria-label="storage"
        name="storage"
        value={selectedStorage}
        onChange={(e) => setSelectedStorage(e.target.value)}
      >
        <FormControlLabel value="filesystem" control={<Radio />} label="Filesystem" />
        <FormControlLabel value="sharepoint" control={<Radio />} label="Microsoft Sharepoint" />
        <FormControlLabel value="googledrive" control={<Radio />} label="Google Drive" />
      </RadioGroup>
      {selectedStorage === 'filesystem' && (
        <TextField label="Local Path" fullWidth margin="normal" />
      )}
      {selectedStorage === 'sharepoint' && (
        <TextField label="Sharepoint URL" fullWidth margin="normal" />
      )}
      {selectedStorage === 'googledrive' && (
        <TextField label="Google Drive Folder ID" fullWidth margin="normal" />
      )}
    </div>
  );
};

export default SetupStorage;
