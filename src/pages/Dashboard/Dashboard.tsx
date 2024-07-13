import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';

const Dashboard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true); 
    const [showMenuIcon, setShowMenuIcon] = useState(false); 
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        setShowMenuIcon(!isOpen);
    }, [isOpen]);

    return (
        <Grid container>
            <Grid item xs={isOpen ? 3 : 'auto'}> 
                <Sidebar isOpen={isOpen} onClose={toggleSidebar} />
            </Grid>
            <Grid item xs={isOpen ? 9 : 12} style={{ position: 'relative' }}> 
        
                {showMenuIcon && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleSidebar}
                        edge="start"
                        sx={{ position: 'absolute', top: 5, left: 5 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <div style={{ marginLeft: isOpen ? '250px' : '50px', transition: 'margin-left 0.5s ease-in-out' }}>
                    <h1>Main Content</h1>
                    <p>This is the main content of your dashboard.</p>
                    <p>Adjust styles and components as needed.</p>
                </div>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
