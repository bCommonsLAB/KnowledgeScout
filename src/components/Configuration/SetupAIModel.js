import React from 'react';
import { Typography, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';

const SetupAIModel = () => {
  const [selectedModel, setSelectedModel] = React.useState('openai');

  return (
    <div>
      <Typography variant="h6">Setup AI Model</Typography>
      <RadioGroup
        aria-label="ai-model"
        name="ai-model"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <FormControlLabel value="openai" control={<Radio />} label="OpenAI" />
        <FormControlLabel value="anthropic" control={<Radio />} label="Anthropic" />
      </RadioGroup>
      {selectedModel === 'openai' && (
        <TextField label="OpenAI API Key" fullWidth margin="normal" type="password" />
      )}
      {selectedModel === 'anthropic' && (
        <TextField label="Anthropic API Key" fullWidth margin="normal" type="password" />
      )}
    </div>
  );
};

export default SetupAIModel;
