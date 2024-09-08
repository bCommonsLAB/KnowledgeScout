import React from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, Box, Stack, Chip } from '@mui/material';
import { Send } from '@mui/icons-material';

const ChatArea = ({ messages, input, setInput, handleSend, selectedChapter, sampleQuestions }) => {
  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" gutterBottom>Chat</Typography>
        <Typography variant="subtitle2" gutterBottom>Beispielfragen zu {selectedChapter}:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {sampleQuestions.map((question, index) => (
            <Chip
              key={index}
              label={question}
              onClick={() => setInput(question)}
              sx={{
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                '&:hover': {
                  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                },
              }}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper elevation={2} sx={{ p: 2, maxWidth: '70%', bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper' }}>
                <ListItemText primary={message.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Stellen Sie Ihre Frage..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="contained" endIcon={<Send />} onClick={handleSend}>
            Senden
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ChatArea;
