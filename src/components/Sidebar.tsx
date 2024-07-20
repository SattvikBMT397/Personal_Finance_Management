import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

import logo from "./Logo/logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const [activeLink, setActiveLink] = useState(location.pathname); // State to track active link

    const handleProfile = () => {
        navigate('/profile')
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLinkClick = (path: string) => {
        setActiveLink(path);
    };

    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            variant="temporary"
            anchor="left"
        >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', padding: '30px 0', display: 'block', marginLeft: '40px' }}>
                <Avatar alt="Logo" src={logo} sx={{ width: '70%', height: 110 }} />
            </Link>
            <List sx={{ width: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop:"20px"}}>
                <ListItemButton
                    component={Link}
                    to="/dashboard"
                    sx={{
                        width: '100%',
                        textDecoration: 'none',
                        color: 'inherit',
                        backgroundColor: activeLink === '/dashboard' ? '#f0f0f0' : 'transparent',
                        textAlign: 'justify',
                        paddingLeft: '60px',
                    }}
                    onClick={() => handleLinkClick('/dashboard')}
                >
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/add-budget"
                    sx={{
                        width: '100%',
                        textDecoration: 'none',
                        color: 'inherit',
                        backgroundColor: activeLink === '/add-budget' ? '#f0f0f0' : 'transparent',
                        textAlign: 'justify',
                        paddingLeft: '60px',
                    }}
                    onClick={() => handleLinkClick('/add-budget')}
                >
                    <ListItemText primary="Add Budget" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/add-transaction"
                    sx={{
                        width: '100%',
                        textDecoration: 'none',
                        color: 'inherit',
                        backgroundColor: activeLink === '/add-transaction' ? '#f0f0f0' : 'transparent',
                        textAlign: 'justify',
                        paddingLeft: '60px',
                    }}
                    onClick={() => handleLinkClick('/add-transaction')}
                >
                    <ListItemText primary="Add Transactions" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/transaction"
                    sx={{
                        width: '100%',
                        textDecoration: 'none',
                        color: 'inherit',
                        backgroundColor: activeLink === '/transaction' ? '#f0f0f0' : 'transparent',
                        textAlign: 'justify',
                        paddingLeft: '60px',
                        
                        
                    }}
                    onClick={() => handleLinkClick('/transaction')}
                >
                    <ListItemText primary="Transactions History" />
                </ListItemButton>
            </List>
            {
                currentUser ? (
                    <div style={{ position: 'absolute', bottom: '70px', left: '20px' }}>
                        <Button variant="contained" onClick={handleLogout} sx={{
                            marginRight: 1,
                            backgroundColor: "#1C8E85",
                            '&:hover': {
                                backgroundColor: '#2ac4b8',
                            },
                        }}>
                            Logout
                        </Button>
                        <Button variant="contained" onClick={handleProfile} sx={{
                            backgroundColor: "#1C8E85",
                            '&:hover': {
                                backgroundColor: '#2ac4b8',
                            },
                        }}>
                            Profile
                        </Button>
                    </div>
                ) : (
                    <div style={{ position: 'absolute', bottom: '70px', left: '20px' }}>
                        <Button variant="contained" onClick={handleLogin} sx={{
                            backgroundColor: "#1C8E85",
                            '&:hover': {
                                backgroundColor: '#2ac4b8',
                            },
                        }}>
                            Login
                        </Button>
                    </div>
                )
            }
        </Drawer>
    );
};

export default Sidebar;
