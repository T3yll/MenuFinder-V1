import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

export interface ToastProps {
  message?: string;
  severity?: AlertColor;
  duration?: number;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}

export interface ToastRef {
  showToast: (props: ToastProps) => void;
}

const Toast = forwardRef<ToastRef, {}>((_props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [duration, setDuration] = useState(6000);
  const [position, setPosition] = useState<{
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  }>({
    vertical: 'bottom',
    horizontal: 'right',
  });

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    showToast: ({
      message = '',
      severity = 'info',
      duration = 6000,
      vertical = 'bottom',
      horizontal = 'right',
    }: ToastProps) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setPosition({ vertical, horizontal });
      setOpen(true);
    },
  }));

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={position}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity} 
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
});

export default Toast; 