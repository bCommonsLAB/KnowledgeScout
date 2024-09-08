import React from 'react';
import { 
  Paper, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box, 
  Button, 
  Tooltip 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const SourceList = ({ sources }) => {
  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ p: 2 }}>Quellen</Typography>
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {sources.map((source, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
            >
              <Typography>
                {source.title} - {source.author}, {source.date}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '30%', mr: 2 }}>
                  <img 
                    src={source.coverImage} 
                    alt={`Cover of ${source.title}`} 
                    style={{ width: '50%', height: 'auto' }}
                  />
                  <Tooltip title={source.url} arrow>
                    <Button 
                      variant="contained" 
                      startIcon={<OpenInNewIcon />}
                      onClick={() => window.open(source.url, '_blank')}
                      sx={{ mt: 1, width: '100%' }}
                    >
                      Öffnen
                    </Button>
                  </Tooltip>
                </Box>
                <Box sx={{ width: '70%' }}>
                  <Typography>
                    ...{source.excerpt.slice(0, 300)}...
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
};

export default SourceList;
