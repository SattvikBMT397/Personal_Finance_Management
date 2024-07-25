import * as React from 'react';
import { IconButton, PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "./Logo/logo.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../redux/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const logoStyle = {
    width: '160px',
    height: 'auto',
    cursor: 'pointer',
};

interface AppAppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function AppAppBar({ }: AppAppBarProps) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleNavigation = (sectionId: string) => {
        setOpen(false);
        navigate(`/${sectionId}`);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    };

    const handleProfile = () => {
        navigate('/profile')
    }
    const handleLogoClick = () => {
        navigate('/');
    };
    const isActive = (path: string) => {
        return location.pathname === `/${path}`;
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                            
                        >
                            <img
                                src={logo}
                                style={logoStyle}
                                alt="logo of sitemark"
                                onClick={handleLogoClick}
                                
                            />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <MenuItem
                                    onClick={() => handleNavigation('dashboard')}
                                    sx={{ py: '6px', px: '12px', backgroundColor: isActive('dashboard') ? '#f0f0f0' : 'transparent' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Dashboard
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleNavigation('add-budget')}
                                    sx={{ py: '6px', px: '12px', backgroundColor: isActive('add-budget') ? '#f0f0f0' : 'transparent' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Add to Budget
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleNavigation('add-transaction')}
                                    sx={{ py: '6px', px: '12px', backgroundColor: isActive('add-transaction') ? '#f0f0f0' : 'transparent' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Add to Transaction
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleNavigation('transaction')}
                                    sx={{ py: '6px', px: '12px', backgroundColor: isActive('transaction') ? '#f0f0f0' : 'transparent' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Transaction History
                                    </Typography>
                                </MenuItem>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >

                            {currentUser ? (
                                <React.Fragment>
                                    <Typography variant="body2" color="text.primary" sx={{ mr: 1 }}>
                                        Hi! {currentUser.name}
                                    </Typography>
                                    <Button
                                        color="inherit"
                                        
                                        onClick={handleLogout}
                                        sx={{ textTransform: 'none', color: "#1C8E85" }}
                                    >
                                        Logout
                                    </Button>

                                    <Button
                                        color="inherit"
                                        
                                        onClick={handleProfile}
                                        sx={{ textTransform: 'none', color:"#1C8E85"}}
                                    >
                                        Proifle
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Button
                                        color="primary"
                                        variant="text"
                                        size="small"
                                        component="a"
                                    >
                                        Sign in
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        component="a"

                                    >
                                        Sign up
                                    </Button>
                                </React.Fragment>
                            )}
                        </Box>
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                        }}
                                    >
        
                                    </Box>
                                    <MenuItem
                                        onClick={() => handleNavigation('dashboard')}
                                        sx={{ backgroundColor: isActive('dashboard') ? '#f0f0f0' : 'transparent' }}
                                    >
                                        Dashboard
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleNavigation('add-budget')}
                                        sx={{ backgroundColor: isActive('add-budget') ? '#f0f0f0' : 'transparent' }}
                                    >
                                        Add to Budget
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleNavigation('add-transaction')}
                                        sx={{ backgroundColor: isActive('add-transaction') ? '#f0f0f0' : 'transparent' }}
                                    >
                                        Add to Transaction
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleNavigation('transaction')}
                                        sx={{ backgroundColor: isActive('transaction') ? '#f0f0f0' : 'transparent' }}
                                    >
                                        Transaction History
                                    </MenuItem>
                                    <Divider />
                                    {currentUser ? (
                                        <MenuItem>
                                            <Typography variant="body2" color="text.primary" sx={{ mr: 1 }}>
                                                Hi! {currentUser.name}
                                            </Typography>
                                            <IconButton color="inherit" onClick={handleLogout} sx={{ color: "#1C8E85" }}>
                                                <LogoutIcon />
                                            </IconButton>
                                            <IconButton color="inherit" onClick={handleProfile} sx={{ color: "#1C8E85" }}>
                                                <AccountCircleIcon />
                                            </IconButton>
                                        </MenuItem>
                                    ) : (
                                        <React.Fragment>
                                            <MenuItem>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    component="a"
                                                    href="/material-ui/getting-started/templates/sign-up/"
                                                    target="_blank"
                                                    sx={{ width: '100%' }}
                                                >
                                                    Sign up
                                                </Button>
                                            </MenuItem>
                                            <MenuItem>
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    component="a"
                                                    href="/material-ui/getting-started/templates/sign-in/"
                                                    target="_blank"
                                                    sx={{ width: '100%' }}
                                                >
                                                    Sign in
                                                </Button>
                                            </MenuItem>
                                        </React.Fragment>
                                    )}
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default AppAppBar;
