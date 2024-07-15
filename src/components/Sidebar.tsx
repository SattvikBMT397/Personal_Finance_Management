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
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', padding: '20px 0', display: 'block', marginLeft: '60px' }}>
                <Avatar alt="Logo" src={logo} sx={{ width: 100, height: 100 }} />
            </Link>
            <List sx={{ width: 250 }}>
                <ListItemButton
                    component={Link}
                    to="/add-budget"
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        marginLeft: "30px",
                        backgroundColor: activeLink === '/add-budget' ? '#f0f0f0' : 'transparent', // Highlight active link
                    }}
                    onClick={() => handleLinkClick('/add-budget')}
                >
                    <ListItemText primary="Add Budget" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/add-transaction"
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        marginLeft: "30px",
                        backgroundColor: activeLink === '/add-transaction' ? '#f0f0f0' : 'transparent', // Highlight active link
                    }}
                    onClick={() => handleLinkClick('/add-transaction')}
                >
                    <ListItemText primary="Add Transactions" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/add-expense"
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        marginLeft: "30px",
                        backgroundColor: activeLink === '/add-expense' ? '#f0f0f0' : 'transparent', // Highlight active link
                    }}
                    onClick={() => handleLinkClick('/add-expense')}
                >
                    <ListItemText primary="Add Expenses" />
                </ListItemButton>
            </List>
            {
                currentUser ? (
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
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
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
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
