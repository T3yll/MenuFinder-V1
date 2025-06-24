import React from 'react';
import { Snackbar, Slide, Box, Typography, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

interface InfoPopUpProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    open: boolean;
    onClose: () => void;
}

// Animation pour l'apparition
const slideIn = keyframes`
  from {
    transform: translateX(100%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styles personnalisés pour chaque type
const getAlertStyles = (type: string) => ({
  success: {
    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
    boxShadow: '0 8px 32px rgba(76, 175, 80, 0.4)',
  },
  error: {
    background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
    boxShadow: '0 8px 32px rgba(244, 67, 54, 0.4)',
  },
  warning: {
    background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    boxShadow: '0 8px 32px rgba(255, 152, 0, 0.4)',
  },
  info: {
    background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    boxShadow: '0 8px 32px rgba(33, 150, 243, 0.4)',
  },
}[type]);

const StyledAlert = styled(Box)<{ alertType: string }>(({ theme, alertType }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 20px',
  borderRadius: '16px',
  color: 'white',
  minWidth: '320px',
  maxWidth: '400px',
  position: 'relative',
  overflow: 'hidden',
  animation: `${slideIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  ...getAlertStyles(alertType),
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
    pointerEvents: 'none',
  },
  
  '&:hover': {
    animation: `${pulse} 0.3s ease-in-out`,
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s ease-in-out',
  }
}));

const IconContainer = styled(Box)({
  marginRight: '12px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '24px',
  animation: `${pulse} 2s ease-in-out infinite`,
});

const MessageContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const StyledCloseButton = styled(IconButton)({
  color: 'rgba(255, 255, 255, 0.8)',
  padding: '4px',
  marginLeft: '8px',
  '&:hover': {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.2s ease-in-out',
});

// Transition personnalisée
function SlideTransition(props: TransitionProps & { children: React.ReactElement }) {
  return <Slide {...props} direction="left" />;
}

const getIcon = (type: string) => {
  const iconProps = { fontSize: 'inherit' as const };
  switch (type) {
    case 'success':
      return <CheckCircleIcon {...iconProps} />;
    case 'error':
      return <ErrorIcon {...iconProps} />;
    case 'warning':
      return <WarningIcon {...iconProps} />;
    case 'info':
    default:
      return <InfoIcon {...iconProps} />;
  }
};

const getTitle = (type: string) => {
  switch (type) {
    case 'success':
      return 'Succès';
    case 'error':
      return 'Erreur';
    case 'warning':
      return 'Attention';
    case 'info':
    default:
      return 'Information';
  }
};

const InfoPopUp: React.FC<InfoPopUpProps> = ({ message, type, open, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            TransitionComponent={SlideTransition}
            sx={{
              zIndex: 9999,
              '& .MuiSnackbarContent-root': {
                padding: 0,
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }
            }}
        >
            <StyledAlert alertType={type}>
                <IconContainer>
                    {getIcon(type)}
                </IconContainer>
                
                <MessageContainer>
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            fontWeight: 600, 
                            marginBottom: '2px',
                            fontSize: '14px',
                            opacity: 0.9
                        }}
                    >
                        {getTitle(type)}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            fontSize: '13px',
                            lineHeight: 1.4,
                            opacity: 0.95
                        }}
                    >
                        {message}
                    </Typography>
                </MessageContainer>
                
                <StyledCloseButton 
                    size="small" 
                    onClick={onClose}
                    aria-label="fermer"
                >
                    <CloseIcon fontSize="small" />
                </StyledCloseButton>
            </StyledAlert>
        </Snackbar>
    );
};

export default InfoPopUp;