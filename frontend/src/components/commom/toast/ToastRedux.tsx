import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppSelector, useAppDispatch } from '../../../hooks/storeToast';
import { hideToast } from '../../../store/slice/toastSlice';

const ToastRedux: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open, message, severity, duration, position } = useAppSelector(state => state.toast);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideToast());
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
};

export default ToastRedux; 