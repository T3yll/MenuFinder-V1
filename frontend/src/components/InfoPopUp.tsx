import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface InfoPopUpProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    open: boolean;
    onClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InfoPopUp: React.FC<InfoPopUpProps> = ({ message, type, open, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClose={onClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default InfoPopUp;