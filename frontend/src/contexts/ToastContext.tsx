import React, { createContext, useContext, useRef } from 'react';
import Toast, { ToastProps, ToastRef } from '../components/commom/toast/Toast';

interface ToastContextType {
  showToast: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toastRef = useRef<ToastRef>(null);

  const showToast = (props: ToastProps) => {
    if (toastRef.current) {
      toastRef.current.showToast(props);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
};

export default ToastContext; 