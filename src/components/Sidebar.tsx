// Sidebar.tsx

import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void; // Add onClose prop to handle closing the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            variant="temporary"
            anchor="left"
        >
            <List sx={{ width: 250 }}>
                <ListItem>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Transactions" />
                </ListItem>
            </List>
            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                <Button variant="contained" onClick={() => console.log('Logged out')}>
                    Logout
                </Button>
            </div>
        </Drawer>
    );
};

export default Sidebar;
