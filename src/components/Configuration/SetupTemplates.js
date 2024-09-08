import React from 'react';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@mui/material';

const SetupTemplates = () => {
  const [selectedTemplates, setSelectedTemplates] = React.useState([]);
  const templates = ['Meeting Notes', 'Project Plan', 'Research Summary', 'Daily Journal'];

  const handleToggle = (value) => () => {
    const currentIndex = selectedTemplates.indexOf(value);
    const newChecked = [...selectedTemplates];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedTemplates(newChecked);
  };

  return (
    <div>
      <Typography variant="h6">Setup Templates</Typography>
      <List>
        {templates.map((template) => (
          <ListItem key={template} dense button onClick={handleToggle(template)}>
            <ListItemText primary={template} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(template)}
                checked={selectedTemplates.indexOf(template) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SetupTemplates;
