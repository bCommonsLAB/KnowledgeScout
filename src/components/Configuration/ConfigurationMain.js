import React, { useState } from 'react';
import { Dialog, DialogContent, Stepper, Step, StepLabel, Button, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import SetupProfiles from './SetupProfiles';
import SetupStorage from './SetupStorage';
import SetupAIModel from './SetupAIModel';
import SetupTemplates from './SetupTemplates';

const steps = ['Setup Profiles', 'Setup Storage', 'Setup AI Model', 'Setup Templates'];

const ConfigurationMain = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <SetupProfiles />;
      case 1:
        return <SetupStorage />;
      case 2:
        return <SetupAIModel />;
      case 3:
        return <SetupTemplates />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2, mb: 2 }}>
          {getStepContent(activeStep)}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={activeStep === steps.length - 1 ? onClose : handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurationMain;
