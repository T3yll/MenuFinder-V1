import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useAppDispatch } from '../../../hooks/storeToast';
import { showToast } from '../../../store/slice/toastSlice';

const TestToaster: React.FC = () => {
  const dispatch = useAppDispatch();

  const showSuccessToast = () => {
    dispatch(showToast({
      message: 'Opération réussie!',
      severity: 'success',
      duration: 3000
    }));
  };

  const showErrorToast = () => {
    dispatch(showToast({
      message: 'Une erreur est survenue!',
      severity: 'error',
      duration: 3000
    }));
  };

  const showInfoToast = () => {
    dispatch(showToast({
      message: 'Information importante!',
      severity: 'info',
      duration: 3000
    }));
  };

  const showWarningToast = () => {
    dispatch(showToast({
      message: 'Attention!',
      severity: 'warning',
      duration: 3000
    }));
  };

  const showLongToast = () => {
    dispatch(showToast({
      message: 'Ce message restera affiché plus longtemps...',
      severity: 'info',
      duration: 6000
    }));
  };

  const showShortToast = () => {
    dispatch(showToast({
      message: 'Message rapide!',
      severity: 'info',
      duration: 1000
    }));
  };

  const showTopLeftToast = () => {
    dispatch(showToast({
      message: 'Toast en haut à gauche',
      severity: 'info',
      duration: 3000,
      vertical: 'top',
      horizontal: 'left'
    }));
  };

  const showTopRightToast = () => {
    dispatch(showToast({
      message: 'Toast en haut à droite',
      severity: 'info',
      duration: 3000,
      vertical: 'top',
      horizontal: 'right'
    }));
  };

  const showBottomLeftToast = () => {
    dispatch(showToast({
      message: 'Toast en bas à gauche',
      severity: 'info',
      duration: 3000,
      vertical: 'bottom',
      horizontal: 'left'
    }));
  };

  const showBottomRightToast = () => {
    dispatch(showToast({
      message: 'Toast en bas à droite',
      severity: 'info',
      duration: 3000,
      vertical: 'bottom',
      horizontal: 'right'
    }));
  };

  const showAllToasts = () => {
    showSuccessToast();
    setTimeout(showErrorToast, 1000);
    setTimeout(showInfoToast, 2000);
    setTimeout(showWarningToast, 3000);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Test des Toasts
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h6">Types de Toasts</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" onClick={showSuccessToast}>
            Success
          </Button>
          <Button variant="contained" color="error" onClick={showErrorToast}>
            Error
          </Button>
          <Button variant="contained" color="info" onClick={showInfoToast}>
            Info
          </Button>
          <Button variant="contained" color="warning" onClick={showWarningToast}>
            Warning
          </Button>
        </Stack>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={showAllToasts}
          sx={{ mt: 2 }}
        >
          Tester Tous les Types
        </Button>
      </Stack>
    </Box>
  );
};

export default TestToaster; 