// CommonButton.tsx
import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface CommonButtonProps extends ButtonProps {
    children: React.ReactNode;
}

const CommonButton: React.FC<CommonButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            {...props}
            fullWidth
            variant="contained"
            sx={{
                backgroundColor: "#1C8E85",
                '&:hover': {
                    backgroundColor: '#2ac4b8',
                },
            }}
        >
            {children}
        </Button>
    );
};

export default CommonButton;
