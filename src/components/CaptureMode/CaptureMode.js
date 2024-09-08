import React from 'react';
import { Typography, Button, Grid, Paper } from '@mui/material';
import { MicNone, YouTube, PictureAsPdf, RecordVoiceOver, QuestionAnswer, Event } from '@mui/icons-material';

const actions = [
  { icon: <MicNone />, text: 'Audio-Datei transkribieren' },
  { icon: <YouTube />, text: 'YouTube-Videos transkribieren und zusammenfassen' },
  { icon: <PictureAsPdf />, text: 'PDF-Dokument erfassen und zusammenfassen' },
  { icon: <RecordVoiceOver />, text: 'Texte diktieren, transkribieren und zusammenfassen' },
  { icon: <QuestionAnswer />, text: 'Interviews transkribieren und zusammenfassen' },
  { icon: <Event />, text: 'Events dokumentieren' },
  // Fügen Sie hier weitere Aktionen hinzu
];

const CaptureMode = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h4" gutterBottom>
        Willkommen im Erfassungsmodus
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Hier können Sie verschiedene Arten von Inhalten erfassen und verarbeiten.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Wählen Sie eine der folgenden Aktionen, um zu beginnen:
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {actions.map((action, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button
              variant="outlined"
              startIcon={action.icon}
              fullWidth
              sx={{ justifyContent: 'flex-start', textAlign: 'left', height: '100%' }}
            >
              {action.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CaptureMode;
