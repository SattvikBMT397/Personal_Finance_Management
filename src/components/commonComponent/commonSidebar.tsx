import { Grid, IconButton } from "@mui/material";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const CommonSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showMenuIcon, setShowMenuIcon] = useState(false);

    useEffect(() => {
        setShowMenuIcon(!isOpen);
    }, [isOpen]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
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
                        sx={{
                            position: 'absolute',
                            top: 5,
                            left: 5,
                            color: 'black',
                            '& .MuiSvgIcon-root': {
                                fontSize: '3rem',  
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
            </Grid>
        </>
    )
}

export default CommonSidebar;
