import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Avatar, Button, Typography, Grid } from '@mui/material';
import { AutoAwesomeOutlined, Folder, ReviewsOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';

const WelcomeScreen = () => {
  const currentProfile = useSelector((state) => state.profile.currentProfile);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCaptureContent = () => {
    navigate('/capture');
  };

  const handleArchiveSearch = () => {
    navigate('/archive');
  };

  const handleChatbot = () => {
    navigate('/chatbot');
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Avatar src="/path-to-avatar-image.jpg" style={{ width: 100, height: 100 }} />
              </Grid>
              <Grid item>
                <Typography variant="h4">Willkommen bei KnowledgeScout!</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Dein persönlicher Assistent zum Erfassen, Verwalten und Entdecken von Wissen.
                </Typography>
              </Grid>
              {user ? (
                <>
                  <Grid item>
                    <Typography variant="body1">
                      Aktuelles Profil: {currentProfile}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">Was möchtest du heute erkunden?</Typography>
                  </Grid>
                  <Grid item container spacing={2} justifyContent="center">
                    <Grid item>
                      <Button variant="contained" startIcon={<AutoAwesomeOutlined />} onClick={handleCaptureContent}>
                        Inhalte erfassen
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" startIcon={<Folder />} onClick={handleArchiveSearch}>
                        Archive durchsuchen
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" startIcon={<ReviewsOutlined />} onClick={handleChatbot}>
                        Fragen stellen
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
                    Anmelden
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default WelcomeScreen;
