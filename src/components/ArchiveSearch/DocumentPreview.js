import React, { useState } from 'react';
import { Paper, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';

const DocumentPreview = ({ document }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {document ? (
        <>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Metadaten
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography><strong>Titel:</strong> {document.metadata.title}</Typography>
              <Typography><strong>Autor:</strong> {document.metadata.author}</Typography>
              <Typography><strong>Datum:</strong> {document.metadata.date}</Typography>
              <Typography><strong>Kategorie:</strong> {document.metadata.category}</Typography>
              <Typography><strong>Tags:</strong> {document.metadata.tags.join(', ')}</Typography>
            </AccordionDetails>
          </Accordion>
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            <ReactMarkdown>{document.markdownContent}</ReactMarkdown>
          </Box>
        </>
      ) : (
        <Typography variant="body1" sx={{ p: 2 }}>Wählen Sie ein Dokument aus der Dateiliste aus, um eine Vorschau anzuzeigen.</Typography>
      )}
    </Paper>
  );
};

export default DocumentPreview;
