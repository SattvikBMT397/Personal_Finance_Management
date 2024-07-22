import { Button, Container, Grid, Typography, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Images from './Logo/Budget Buddy.png'
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { AccountCircle, ExitToApp, Dashboard } from '@mui/icons-material';
import StartIcon from '@mui/icons-material/Star';
import bg from "./Logo/lg.jpg";
import ds from "./Logo/ds.png";
import logo from "./Logo/logo.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/signup');
  const handleLogout = () => dispatch(logout());
  const handleDashboard = () => navigate('/dashboard');

  return (
    <section className='home'>
      <AppBar position="static" sx={{ backgroundColor: "#1C8E85" }}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ height: 60, marginRight: 20, width: 80 }} />
          <div style={{ flexGrow: 1 }} />
          {currentUser ? (
            <>
              <IconButton color="inherit" onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
              <IconButton color="inherit" onClick={handleDashboard}>
                <Dashboard />
              </IconButton>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit" startIcon={<AccountCircle />}>
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit" startIcon={<AccountCircle />}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <Grid
          container
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={4}
          sx={{ marginTop: '20px' }}
        >
          <Grid item xs={12} md={6}>
            <Box textAlign={['center', 'left']}>
              <Typography variant="h3" gutterBottom style={{ color: '#1C8E85' }}>
                LEARN FROM THE <span style={{ color: '#3f51b5' }}>Expense Tracker</span>
              </Typography>
              <Typography variant="h4" gutterBottom style={{ color: '#757575', marginBottom: '20px' }}>
                Your Personal Assistant with Tips, Reminders, and Advice
              </Typography>
              <Typography variant="body1" style={{ color: '#757575', marginBottom: '20px' }}>
                <span style={{ color: '#1C8E85', fontWeight: 'bold' }}>Welcome, everyone!</span><br />
                Budget Buddy is here to support you on your journey to financial freedom,
                offering tips, reminders, and personalized advice along the way.
              </Typography>
              {!currentUser && (
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="large" color="secondary" startIcon={<StartIcon />}>
                    Get Started
                  </Button>
                </Link>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={bg}
              alt="background"
              style={{
                maxWidth: '100%',
                height: 'auto',
                animation: 'slide-in 2s infinite'
              }}
              className="animated-image"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center" mt={4}>
            <Typography variant="h4" style={{ color: '#1C8E85' }}>
              Our Services
            </Typography>
            <Box mt={2}>
              <hr style={{ width: '100%', borderTop: '2px solid #1C8E85' }} />
            </Box>
            <img
              src={ds} // Replace with your dashboard image source
              alt="Dashboard"
              style={{ maxWidth: '100%', height: 'auto', marginTop: '20px', marginBottom:"10px" }}
            />
          </Box>
        </Grid>
      </Container>
    </section>
  );
}

export default Home;
