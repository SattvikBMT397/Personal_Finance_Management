import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

interface CommonMenuItemProps {
    path: string;
    isActive: boolean;
    handleNavigation: (path: string) => void;
    children: React.ReactNode;
}

const CommonMenuItem: React.FC<CommonMenuItemProps> = ({ path, isActive, handleNavigation, children }) => {
    return (
        <MenuItem
            onClick={() => handleNavigation(path)}
            sx={{
                py: '6px',
                px: '12px',
                position: 'relative',
                
                textDecoration: 'none',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: '100%',
                    borderBottom: isActive ? '2px solid #1C8E85' : 'none',
                    fontWeight: isActive ? 'bold' : 'normal',
                },
                '&:hover': {
                    textDecoration: 'underline',
                },
            }}
        >
            <Typography variant="body2" color="text.primary">
                {children}
            </Typography>
        </MenuItem>
    );
};

export default CommonMenuItem;
