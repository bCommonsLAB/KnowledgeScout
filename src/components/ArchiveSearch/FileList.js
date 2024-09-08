import React from 'react';
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const FileList = ({ files, onFileSelect, selectedCategory }) => {
  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ p: 2 }}>Dateien in Kategorie {selectedCategory}</Typography>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <TableContainer>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Größe</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Aktion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id} hover sx={{ cursor: 'pointer' }}>
                  <TableCell onClick={() => onFileSelect(file)}>{file.name}</TableCell>
                  <TableCell onClick={() => onFileSelect(file)}>{file.size}</TableCell>
                  <TableCell onClick={() => onFileSelect(file)}>{file.date}</TableCell>
                  <TableCell onClick={() => onFileSelect(file)}>{file.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<OpenInNewIcon />}
                      onClick={() => window.open(file.pdfUrl, '_blank')}
                    >
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default FileList;
