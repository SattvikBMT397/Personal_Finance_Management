// CommonButton.tsx
import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Loader from './commonLoader';

interface CommonButtonProps extends ButtonProps {
    children: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({ children,disabled, loading, ...props }) => {
    return (
        <Button
            {...props}
            fullWidth
            variant="contained"
            disabled={disabled || loading}
            sx={{
                backgroundColor: "#1C8E85",
                '&:hover': {
                    backgroundColor: '#2ac4b8',
                },
        
            }}
        >
            {children}
            {loading && <Loader />}
        </Button>
    );
};

export default CommonButton;
