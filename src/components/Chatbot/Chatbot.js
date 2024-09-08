import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import TableOfContents from './TableOfContents';
import ChatArea from './ChatArea';
import SourceList from './SourceList';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('1.1');
  const [expanded, setExpanded] = useState(['1']);
  const [selected, setSelected] = useState('');
  const [setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      setLoading(true);
      // Simulate response time
      setTimeout(() => {
        setMessages(msgs => [...msgs, { text: "Hier ist eine Antwort basierend auf den verfügbaren Quellen.", sender: 'bot' }]);
        setLoading(false);
      }, 1000);
    }
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeId) => {
    setSelected(nodeId);
    setSelectedChapter(nodeId);
  };

  const items = [
    {
      id: '1',
      name: 'Ökosysteme',
      children: [
        { id: '1.1', name: 'Definition' },
        { id: '1.2', name: 'Typen' },
        { id: '1.3', name: 'Struktur' },
        { id: '1.4', name: 'Funktion' },
        { id: '1.5', name: 'Energiefluss' },
        { id: '1.6', name: 'Nährstoffkreisläufe' },
        { id: '1.7', name: 'Stabilität' },
        { id: '1.8', name: 'Resilienz' },
        { id: '1.9', name: 'Sukzession' },
        { id: '1.10', name: 'Menschlicher Einfluss' },
      ],
    },
    { id: '2', name: 'Artvielfalt' },
    { id: '3', name: 'Genetische Vielfalt' },
    { id: '4', name: 'Evolution' },
    { id: '5', name: 'Naturschutz' },
    { id: '6', name: 'Klimawandel' },
    { id: '7', name: 'Invasive Arten' },
    { id: '8', name: 'Biodiversitätsverlust' },
    { id: '9', name: 'Ökologische Nischen' },
    { id: '10', name: 'Biome' },
  ];

  const sampleQuestions = [
    "Was ist ein Ökosystem?",
    "Welche Komponenten bilden ein Ökosystem?",
    "Wie unterscheiden sich Ökosysteme von Biomen?",
    "Was ist der Unterschied zwischen biotischen und abiotischen Faktoren?",
    "Wie grenzt man ein Ökosystem räumlich ab?",
    "Welche Rolle spielt Energie in einem Ökosystem?",
    "Wie definiert man die Grenzen eines Ökosystems?",
  ];

  const sources = [
    {
      title: "Einführung in die Ökologie",
      author: "Smith, J.",
      date: "2020",
      coverImage: "https://bio-go.at/wp-content/uploads/2019/07/kein-bild-vorhanden-1187.png",
      url: "https://example.com/book1",
      excerpt: "Dieses Buch bietet eine umfassende Einführung in die Grundlagen der Ökologie. Es behandelt verschiedene Ökosysteme, ihre Funktionsweisen und die Wechselwirkungen zwischen Organismen und ihrer Umwelt."
    },
    {
      title: "Ökosysteme und ihre Funktionen",
      author: "Johnson, A. et al.",
      date: "2019",
      coverImage: "https://bio-go.at/wp-content/uploads/2019/07/kein-bild-vorhanden-1187.png",
      url: "https://example.com/article1",
      excerpt: "Diese Studie untersucht die vielfältigen Funktionen von Ökosystemen und ihre Bedeutung für die globale Biodiversität. Die Autoren analysieren verschiedene Ökosystemtypen und ihre spezifischen Beiträge zur Umwelt."
    },
    {
      title: "Grundlagen der Ökosystemforschung",
      author: "Brown, M.",
      date: "2021",
      coverImage: "https://bio-go.at/wp-content/uploads/2019/07/kein-bild-vorhanden-1187.png",
      url: "https://example.com/book2",
      excerpt: "Brown präsentiert in diesem Werk die neuesten Methoden und Erkenntnisse der Ökosystemforschung. Das Buch bietet einen tiefen Einblick in die Komplexität ökologischer Systeme und ihre Untersuchungsmethoden."
    },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
      <Grid container spacing={2} sx={{ flexGrow: 1, margin: 2, width: '100%' }}>
        <Grid item xs={3} sx={{ height: '100%', paddingTop: '0 !important' }}>
          <TableOfContents
            items={items}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
          />
        </Grid>
        <Grid item xs={5} sx={{ height: '100%', paddingTop: '0 !important' }}>
          <ChatArea
            messages={messages}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            selectedChapter={selectedChapter}
            sampleQuestions={sampleQuestions}
          />
        </Grid>
        <Grid item xs={4} sx={{ height: '100%', paddingTop: '0 !important' }}>
          <SourceList sources={sources} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chatbot;
