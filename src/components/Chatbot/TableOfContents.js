import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

const TableOfContents = ({ items, expanded, selected, onNodeToggle, onNodeSelect }) => {
  const renderTree = (nodes) => (
    <TreeItem itemId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ p: 2 }}>Inhaltsverzeichnis</Typography>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <SimpleTreeView
          aria-label="file system navigator"
          defaultExpandIcon={<ChevronRight />}
          defaultCollapseIcon={<ExpandMore />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={onNodeToggle}
          onNodeSelect={onNodeSelect}
        >
          {items.map((item) => renderTree(item))}
        </SimpleTreeView>
      </Box>
    </Paper>
  );
};

export default TableOfContents;
