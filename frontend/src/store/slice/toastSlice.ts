import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

export interface ToastState {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration: number;
  position: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

const initialState: ToastState = {
  open: false,
  message: '',
  severity: 'info',
  duration: 6000,
  position: {
    vertical: 'bottom',
    horizontal: 'right',
  },
};

export interface ShowToastPayload {
  message: string;
  severity?: AlertColor;
  duration?: number;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ShowToastPayload>) => {
      const { message, severity = 'info', duration = 6000, vertical = 'bottom', horizontal = 'right' } = action.payload;
      state.message = message;
      state.severity = severity;
      state.duration = duration;
      state.position = { vertical, horizontal };
      state.open = true;
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer; 