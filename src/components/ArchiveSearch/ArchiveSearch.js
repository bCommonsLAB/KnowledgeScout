import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import ArchiveTableOfContents from './ArchiveTableOfContents';
import FileList from './FileList';
import DocumentPreview from './DocumentPreview';
import contentData from '../../content.json';

const ArchiveSearch = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [expanded, setExpanded] = useState(['1']);
  const [selected, setSelected] = useState('');
  const [items, setItems] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setItems(contentData.items);
    // Hier würden Sie normalerweise die Dateien für die ausgewählte Kategorie laden
    setFiles([
      { id: '1', name: 'Dokument 1.pdf', size: '1.2 MB', date: '2023-05-01', status: 'Aktiv', pdfUrl: 'https://example.com/path/to/document1.pdf' },
      { id: '2', name: 'Dokument 2.docx', size: '568 KB', date: '2023-04-28', status: 'Archiviert', pdfUrl: 'https://example.com/path/to/document2.pdf' },
      // ... weitere Dateien
    ]);
  }, [selectedCategory]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeId) => {
    setSelected(nodeId);
    setSelectedCategory(nodeId);
  };

  const handleFileSelect = (file) => {
    // Hier würden Sie normalerweise das ausgewählte Dokument laden
    setSelectedDocument({
      pdfUrl: file.pdfUrl,
      markdownContent: '# Dokumenttitel\n\nInhalt des Dokuments...',
      metadata: {
        title: file.name,
        author: 'Max Mustermann',
        date: file.date,
        category: selectedCategory,
        tags: ['Ökologie', 'Südtirol']
      }
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
      <Grid container spacing={2} sx={{ flexGrow: 1, margin: 2, width: '100%' }}>
        <Grid item xs={2.4} sx={{ height: '100%', paddingTop: '0 !important' }}>
          <ArchiveTableOfContents
            items={items}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
          />
        </Grid>
        <Grid item xs={4.8} sx={{ height: '100%', paddingTop: '0 !important' }}>
          <FileList
            files={files}
            onFileSelect={handleFileSelect}
            selectedCategory={selectedCategory}
          />
        </Grid>
        <Grid item xs={4.8} sx={{ height: '100%', paddingTop: '0 !important' }}>
          <DocumentPreview 
            document={selectedDocument}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArchiveSearch;
